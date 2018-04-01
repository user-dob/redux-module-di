import { Effect } from "redux-saga";
import { all } from "redux-saga/effects";
import { IModuleVisitor } from "./IModuleVisitor";
import { Module } from "../Module";

export class SagaModuleVisitor implements IModuleVisitor {
    private effects: Effect[];

    public constructor() {
        this.effects = [];
    }

    public visit(module: Module): void {
        module.sagas
            .map(item => module.getProvider(item))
            .forEach(provider => {
                const effects = provider.effects.bind(provider);
                this.effects = this.effects.concat(effects());
            });
    }

    public createSaga(): () => Iterator<Effect> {
        const effects = this.effects;

        return () => function* () {
            yield all(effects);
        } ();
    } 
}
