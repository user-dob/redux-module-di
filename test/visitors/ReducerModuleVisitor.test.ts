import { expect } from "chai";
import { injectable } from "inversify";
import { module, ModuleBuilder, IReducerService, ReducerModuleVisitor } from "../../src";

describe("ReducerModuleVisitor", () => {

    it ("ReducerModuleVisitor with one reducer", () => {

        @injectable()
        class ReducerServise implements IReducerService {
            public name = "test";
            public reducer(state: any = 0, action: any) {
                switch (action.type) {
                    case "increment":
                        return +state + 1;
                    default:
                        return state;
                }
            }
        } 

        @module({
            name: "test",
            reducers: [
                ReducerServise
            ]
        })
        class TestModule {}

        const reducerModuleVisitor = new ReducerModuleVisitor();

        new ModuleBuilder()
            .addModule(TestModule)
            .addModuleVisitor(reducerModuleVisitor)
            .build();

        const reducer = reducerModuleVisitor.createReducer();

        const s1 = reducer({}, { type: "increment" });
        expect(s1).to.be.eql({test: 1});
        const s2 = reducer(s1, { type: "increment" });
        expect(s2).to.be.eql({test: 2});
    });

    it ("ReducerModuleVisitor with one reducer and service", () => {

        @injectable()
        class Provider {}

        @injectable()
        class ReducerServise implements IReducerService {
            public name = "test";

            public constructor(provider: Provider) {
                expect(provider).to.be.instanceof(Provider);
            }

            public reducer(state: any = 0, action: any) {
                switch (action.type) {
                    case "increment":
                        return +state + 1;
                    default:
                        return state;
                }
            }
        } 

        @module({
            name: "test",
            reducers: [
                ReducerServise
            ],
            providers: [
                Provider
            ]
        })
        class TestModule {}

        const reducerModuleVisitor = new ReducerModuleVisitor();

        new ModuleBuilder()
            .addModule(TestModule)
            .addModuleVisitor(reducerModuleVisitor)
            .build();

        const reducer = reducerModuleVisitor.createReducer();

        const s1 = reducer({}, { type: "increment" });
        expect(s1).to.be.eql({test: 1});
        const s2 = reducer(s1, { type: "increment" });
        expect(s2).to.be.eql({test: 2});
    });

});
