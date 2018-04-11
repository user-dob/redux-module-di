import { expect } from "chai";
import { ReModule, MODULE_METADATA_KEY } from "../../src";

describe("@ReModule()", () => {

    it("Should generate metadata if declared ReModule", () => {

        @ReModule({
            name: "test"
        })
        class Test {}

        const metadata = Reflect.getMetadata(MODULE_METADATA_KEY, Test);

        expect(metadata).to.be.eql({name: "test"});
    });
});
