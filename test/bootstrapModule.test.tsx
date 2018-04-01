import { expect } from "chai";
import { module, createModuleStore } from "../src";

describe("bootstrapModule", () => {

    it("createModuleStore", () => {

        @module({
            name: "test"
        })
        class TestModule {}

        const store = createModuleStore(TestModule);

        expect(store).to.have.property("module");
        expect(store).to.have.property("runSaga");      
        
    });

});
