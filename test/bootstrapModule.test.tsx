import { expect } from "chai";
import { ReModule, createModuleStore } from "../src";

describe("bootstrapModule", () => {

    it("createModuleStore", () => {

        @ReModule({
            name: "test"
        })
        class TestModule {}

        const store = createModuleStore(TestModule);

        expect(store).to.have.property("module");
        expect(store).to.have.property("runSaga");      
        
    });

});
