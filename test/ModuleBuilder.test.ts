import { expect } from 'chai';
import { module } from '../src/annotation/module';
import { ModuleBuilder } from '../src/ModuleBuilder';

describe('ModuleBuilder', () => {

    it('build empty module', () => {

        @module({
            name: 'test'
        })
        class Test {}

        const m = new ModuleBuilder()
            .addModule(Test)
            .build();

        expect(m.name).to.be.eql('test');
        expect(m.imports).to.be.eql([]);
        expect(m.exports).to.be.eql([]);
        expect(m.providers).to.be.eql([]);
        expect(m.reducers).to.be.eql([]);
        expect(m.sagas).to.be.eql([]);
        expect(m.components).to.be.eql([]);
        expect(m.bootstrap).to.be.eql(null);
    })

})
