import { expect } from "chai";
import { injectable } from "inversify";
import { module, ModuleBuilder, Module, IModuleVisitor } from "../src";

describe("ModuleBuilder", () => {

    it("build empty module", () => {

        @module({
            name: "test"
        })
        class TestModule {}

        const build = new ModuleBuilder()
            .addModule(TestModule)
            .build();

        expect(build.name).to.be.eql("test");
        expect(build.imports).to.be.eql([]);
        expect(build.exports).to.be.eql([]);
        expect(build.providers).to.be.eql([]);
        expect(build.reducers).to.be.eql([]);
        expect(build.sagas).to.be.eql([]);
        expect(build.components).to.be.eql([]);
        expect(build.bootstrap).to.be.eql(null);

    });

    it("build module with provider", () => {

        @injectable()
        class Provider {}

        @injectable()
        class Test {
            public constructor(provider: Provider) {
                expect(provider).to.be.instanceof(Provider);
            }
        }

        @module({
            name: "test",
            providers: [
                Provider,
                Test
            ]
        })
        class TestModule {}        

        const build = new ModuleBuilder()
            .addModule(TestModule)
            .build();

        build.getProvider(Test);
    });

    it("build module with useClass", () => {

        @injectable()
        class Provider {}

        @injectable()
        class Provider1 extends Provider {}

        @injectable()
        class Test {
            public constructor(provider: Provider) {
                expect(provider.constructor).to.be.eql(Provider1);
            }
        }

        @module({
            name: "test",
            providers: [
                {provide: Provider, useClass: Provider1},
                Test
            ]
        })
        class TestModule {}        

        const build = new ModuleBuilder()
            .addModule(TestModule)
            .build();

        build.getProvider(Test);
    });

    it("build module with useValue", () => {

        @injectable()
        class Provider {}

        const value = 1;
        
        @injectable()
        class Test {
            public constructor(provider: Provider) {
                expect(provider).to.be.eql(value);
            }
        }

        @module({
            name: "test",
            providers: [
                {provide: Provider, useValue: value},
                Test
            ]
        })
        class TestModule {}        

        const build = new ModuleBuilder()
            .addModule(TestModule)
            .build();

        build.getProvider(Test);
    });

    it("build module with useContainer", () => {

        @injectable()
        class Provider {}
        
        @injectable()
        class Test {
            public constructor(provider: Provider) {
                expect(provider).to.be.instanceof(Provider);
            }
        }

        @module({
            name: "test",
            providers: [
                {provide: Provider, useContainer: container => container.bind(Provider).toSelf()},
                Test
            ]
        })
        class TestModule {}        

        const build = new ModuleBuilder()
            .addModule(TestModule)
            .build();

        build.getProvider(Test);
    });

    it("build module with 2 identical Providers", () => {

        @injectable()
        class Provider {}
        
        @injectable()
        class Test {
            public constructor(provider: Provider) {
                expect(provider).to.be.instanceof(Provider);
            }
        }

        @module({
            name: "test",
            providers: [
                Provider,
                Provider,
                Test
            ]
        })
        class TestModule {}        

        const build = new ModuleBuilder()
            .addModule(TestModule)
            .build();

        build.getProvider(Test);
    });

    it("build module with exports", () => {

        @injectable()
        class ExportProvider {}

        @module({
            name: "import",
            exports: [
                ExportProvider
            ]
        })
        class ImportModule {} 

        @injectable()
        class Test {
            public constructor(provider: ExportProvider) {
                expect(provider).to.be.instanceof(ExportProvider);
            }
        }
        
        @module({
            name: "test",
            imports: [
                ImportModule
            ],
            providers: [
                Test
            ]
        })
        class TestModule {}

        const build = new ModuleBuilder()
            .addModule(TestModule)
            .build();

        build.getProvider(Test);
    });

    it("build module with exports with useValue", () => {

        @injectable()
        class ExportProvider {}

        @module({
            name: "import",
            exports: [
                ExportProvider
            ],
            providers: [
                {provide: ExportProvider, useValue: 1}
            ]            
        })
        class ImportModule {} 

        @injectable()
        class Test {
            public constructor(provider: ExportProvider) {
                expect(provider).to.be.eql(1);
            }
        }
        
        @module({
            name: "test",
            imports: [
                ImportModule
            ],
            providers: [
                Test
            ]
        })
        class TestModule {}

        const build = new ModuleBuilder()
            .addModule(TestModule)
            .build();

        build.getProvider(Test);
    });

    it("build module with 2 exports", () => {

        @injectable()
        class ExportProvider {}

        @module({
            name: "import",
            exports: [
                ExportProvider
            ]            
        })
        class ImportModule {} 
        
        @module({
            name: "test1",
            imports: [
                ImportModule
            ]
        })
        class TestModule1 {
            public constructor(provider: ExportProvider) {
                expect(provider).to.be.instanceof(ExportProvider);
            }
        }

        @module({
            name: "test2",
            imports: [
                ImportModule
            ]
        })
        class TestModule2 {
            public constructor(provider: ExportProvider) {
                expect(provider).to.be.instanceof(ExportProvider);
            }
        }

        @module({
            name: "test",
            imports: [
                TestModule1,
                TestModule2
            ]
        })
        class TestModule {}

        const build = new ModuleBuilder()
            .addModule(TestModule)
            .build();

        build.getProvider(TestModule);
    });

    it("build module with Visitor", () => {

        class Visitor implements IModuleVisitor {
            public visit(m: Module): void {
                expect(m.name).to.be.eql("test");                
            }
        }

        @module({
            name: "test"
        })
        class TestModule {}

        const visitor = new Visitor();

        new ModuleBuilder()
            .addModule(TestModule)
            .addModuleVisitor(visitor)
            .build();

    });
});
