import { expect } from "chai";
import { injectable } from "inversify";
import { ReModule, getProviderByModule, ModuleBuilder } from "../src";

describe("getProviderByModule", () => {

    it("getProviderByModule get Provider", () => {

        @injectable()
        class Provider {}

        @ReModule({
            name: "test",
            providers: [
                Provider
            ]
        })
        class TestModule {}

        const build = new ModuleBuilder()
            .addModule(TestModule)
            .build();


        expect(getProviderByModule(TestModule, Provider)).to.be.instanceof(Provider);        
    });

});