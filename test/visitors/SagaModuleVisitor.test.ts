import { expect } from 'chai';
import { injectable } from 'inversify';
import { take, fork, all, Effect } from 'redux-saga/effects';
import { module } from '../../src';
import { ModuleBuilder } from '../../src';
import { ISagaService, SagaModuleVisitor } from '../../src'

describe('SagaModuleVisitor', () => {
    
    it('SagaModuleVisitor with saga', () => {

        const testSaga = function* () { yield take('increment'); } 

        @injectable()
        class SagaService implements ISagaService {

            testSaga = testSaga

            effects(): Effect[] {
                return [
                    fork(this.testSaga)
                ]
            }
        }

        @module({
            name: 'test',
            sagas: [
                SagaService
            ]
        })
        class TestModule {}

        const sagaModuleVisitor = new SagaModuleVisitor();

        const build = new ModuleBuilder()
            .addModule(TestModule)
            .addModuleVisitor(sagaModuleVisitor)
            .build();

        const sagas = sagaModuleVisitor.createSaga();
        const gen = sagas();
        const effect = all([
            fork(testSaga)
        ])

        expect(gen.next().value).to.deep.equal(effect);
    })

})