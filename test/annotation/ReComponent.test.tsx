import { injectable } from "inversify";
import * as React from "react";
import { expect } from "chai";
import * as TestRenderer from "react-test-renderer";
import { ModuleBuilder, ReModule, ReComponent } from "../../src";

describe("@ReComponent()", () => {

    it("component with provider", () => {

        @injectable()
        class Provider {}

        @ReComponent()
        class TestComponent extends React.Component<any, any> {
            public constructor(props: any, context: any, provider: Provider) {
                super(props, context);

                expect(provider).to.be.instanceof(Provider);
            }

            public render() {
                return null;
            }
        }

        @ReModule({
            name: "test",
            components: [
                TestComponent
            ],
            providers: [
                Provider
            ]
        })
        class TestModule {}

        new ModuleBuilder()
            .addModule(TestModule)
            .build();

        TestRenderer.create(<TestComponent />);    
    });
    
    it("component with 2 providers", () => {

        @injectable()
        class Provider {}

        @injectable()
        class Provider1 {}

        @ReComponent()
        class TestComponent extends React.Component<any, any> {
            public constructor(props: any, context: any, provider: Provider, provider1: Provider1) {
                super(props, context);

                expect(provider).to.be.instanceof(Provider);
                expect(provider1).to.be.instanceof(Provider1);
            }

            public render() {
                return null;
            }
        }

        @ReModule({
            name: "test",
            components: [
                TestComponent
            ],
            providers: [
                Provider,
                Provider1
            ]
        })
        class TestModule {}

        new ModuleBuilder()
            .addModule(TestModule)
            .build();

        TestRenderer.create(<TestComponent />);
    });

    it("component with provider with provider", () => {

        @injectable()
        class Provider {}

        @injectable()
        class Provider1 {
            public constructor(provider: Provider) {
                expect(provider).to.be.instanceof(Provider);
            }
        }

        @ReComponent()
        class TestComponent extends React.Component<any, any> {
            public constructor(props: any, context: any, provider1: Provider1) {
                super(props, context);

                expect(provider1).to.be.instanceof(Provider1);
            }

            public render() {
                return null;
            }
        }

        @ReModule({
            name: "test",
            components: [
                TestComponent
            ],
            providers: [
                Provider,
                Provider1
            ]
        })
        class TestModule {}

        new ModuleBuilder()
            .addModule(TestModule)
            .build();

        TestRenderer.create(<TestComponent />);
    });

});
