import { Effect } from 'redux-saga';
import { all } from 'redux-saga/effects';
import { IModuleVisitor } from './IModuleVisitor';
import { Module } from '../Module';

export class SagaModuleVisitor implements IModuleVisitor {
    private effects: Effect[];

    constructor() {
        this.effects = [];
    }

    visit(module: Module): void {
        module.sagas
            .map(item => module.getProvider(item))
            .forEach(provider => {
                const effects = provider.effects.bind(provider);
                this.effects = this.effects.concat(effects());
            });
    }

    createSaga(): () => Iterator<Effect> {
        const { effects } = this;

        function* effectsIterator() {
            yield all(effects);
        };

        return () => effectsIterator();
    } 
}