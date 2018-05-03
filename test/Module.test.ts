import { expect } from "chai";
import { injectable } from "inversify";
import { ReModule, Module, ModuleBuilder } from "../src";

describe("Module", () => {

    it("getModule", () => {

        @ReModule({
            name: "test"
        })
        class TestModule {}

        new ModuleBuilder()
            .addModule(TestModule)
            .build();
        
        const module = Module.getModule(TestModule);  

        expect(module).to.have.property("name", "test");
    });

    it("getProviderByModule has Provider", () => {

        @injectable()
        class Provider {}

        @ReModule({
            name: "test",
            providers: [
                Provider
            ]
        })
        class TestModule {}

        new ModuleBuilder()
            .addModule(TestModule)
            .build();

        expect(Module.getProviderByModule(TestModule, Provider)).to.be.instanceof(Provider);        
    });

});
