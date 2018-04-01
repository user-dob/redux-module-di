import { expect } from "chai";
import { module, MODULE_METADATA_KEY } from "../../src";

describe("@module()", () => {

    it("Should generate metadata if declared module", () => {

        @module({
            name: "test"
        })
        class Test {}

        const metadata = Reflect.getMetadata(MODULE_METADATA_KEY, Test);

        expect(metadata).to.be.eql({name: "test"});
    });
});
