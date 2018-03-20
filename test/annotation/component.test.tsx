import { injectable } from 'inversify';
import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { ModuleBuilder } from '../../src';
import { module, component } from '../../src';

describe('@component()', () => {

    it('component with provider', () => {

        @injectable()
        class Provider {}

        @component()
        class TestComponent extends React.Component<any, any> {
            constructor(props: any, context: any, provider: Provider) {
                super(props, context);

                expect(provider).to.be.instanceof(Provider);
            }

            render() {
                return null
            }
        }

        @module({
            name: 'test',
            components: [
                TestComponent
            ],
            providers: [
                Provider
            ]
        })
        class TestModule {}

        const build = new ModuleBuilder()
            .addModule(TestModule)
            .build();

        const wrapper = shallow(<TestComponent />);

    })
    
    it('component with 2 providers', () => {

        @injectable()
        class Provider {}

        @injectable()
        class Provider1 {}

        @component()
        class TestComponent extends React.Component<any, any> {
            constructor(props: any, context: any, provider: Provider, provider1: Provider1) {
                super(props, context);

                expect(provider).to.be.instanceof(Provider);
                expect(provider1).to.be.instanceof(Provider1);
            }

            render() {
                return null
            }
        }

        @module({
            name: 'test',
            components: [
                TestComponent
            ],
            providers: [
                Provider,
                Provider1
            ]
        })
        class TestModule {}

        const build = new ModuleBuilder()
            .addModule(TestModule)
            .build();

        const wrapper = shallow(<TestComponent />);

    })

    it('component with provider with provider', () => {

        @injectable()
        class Provider {}

        @injectable()
        class Provider1 {
            constructor(provider: Provider) {
                expect(provider).to.be.instanceof(Provider);
            }
        }

        @component()
        class TestComponent extends React.Component<any, any> {
            constructor(props: any, context: any, provider1: Provider1) {
                super(props, context);

                expect(provider1).to.be.instanceof(Provider1);
            }

            render() {
                return null
            }
        }

        @module({
            name: 'test',
            components: [
                TestComponent
            ],
            providers: [
                Provider,
                Provider1
            ]
        })
        class TestModule {}

        const build = new ModuleBuilder()
            .addModule(TestModule)
            .build();

        const wrapper = shallow(<TestComponent />);

    })
    
})