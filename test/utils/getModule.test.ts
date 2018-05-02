import { expect } from "chai";
import { ReModule, getModule, ModuleBuilder } from "../../src";

describe("getModule", () => {

    it("getModule has module with name", () => {

        @ReModule({
            name: "test"
        })
        class TestModule {}

        const build = new ModuleBuilder()
            .addModule(TestModule)
            .build();
        
        const module = getModule(TestModule);  

        expect(module).to.have.property("name", "test");
    })

});
