import { expect } from 'chai';
import { injectable } from 'inversify';
import { module } from '../src/annotation/module';
import { ModuleBuilder } from '../src/ModuleBuilder';

describe('ModuleBuilder', () => {

    it('build empty module', () => {

        @module({
            name: 'test'
        })
        class TestModule {}

        const build = new ModuleBuilder()
            .addModule(TestModule)
            .build();

        expect(build.name).to.be.eql('test');
        expect(build.imports).to.be.eql([]);
        expect(build.exports).to.be.eql([]);
        expect(build.providers).to.be.eql([]);
        expect(build.reducers).to.be.eql([]);
        expect(build.sagas).to.be.eql([]);
        expect(build.components).to.be.eql([]);
        expect(build.bootstrap).to.be.eql(null);

    })

    it('build module with provider', () => {

        @injectable()
        class Provider {}

        @injectable()
        class Test {
            constructor(provider: Provider) {
                expect(provider).to.be.instanceof(Provider);
            }
        }

        @module({
            name: 'test',
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
    })

    it('build module with imports', () => {

        @injectable()
        class ExportProvider {}

        @module({
            name: 'import',
            exports: [
                ExportProvider
            ]
        })
        class ImportModule {} 

        @injectable()
        class Test {
            constructor(provider: ExportProvider) {
                expect(provider).to.be.instanceof(ExportProvider);
            }
        }
        
        @module({
            name: 'test',
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
    })

})
