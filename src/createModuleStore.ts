import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Module } from './Module';
import { ModuleBuilder } from './ModuleBuilder';
import { Type } from './interfaces/type';
import { ReducerModuleVisitor, SagaModuleVisitor } from './visitors';

export interface ModuleStore<S> extends Store<S> {
    runSaga(): void;
    module: Module
}

export const createModuleStore = (target: Type<any>, middlewares: any[] = []): ModuleStore<any> => {
    const reducerModuleVisitor = new ReducerModuleVisitor();
    const sagaModuleVisitor = new SagaModuleVisitor();

    const module = new ModuleBuilder()
        .addModule(target)
        .addModuleVisitor(reducerModuleVisitor)
        .addModuleVisitor(sagaModuleVisitor)
        .build();

    const reducer = reducerModuleVisitor.createReducer();
    const saga = sagaModuleVisitor.createSaga();
    const sagaMiddleware = createSagaMiddleware();

    middlewares.push(sagaMiddleware);

    const store = <ModuleStore<any>>createStore(
        reducer,
        applyMiddleware(...middlewares)
    );

    store.runSaga = () => {
        sagaMiddleware.run(saga);
    }

    store.module = module;

    return store;
}