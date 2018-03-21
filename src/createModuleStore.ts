import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Module } from './Module';
import { ModuleBuilder } from './ModuleBuilder';
import { Type } from './interfaces/type';
import { ReducerModuleVisitor, SagaModuleVisitor } from './visitors';

export const createModuleStore = (module: Type<any>, middlewares: any[] = []) => {
    const reducerModuleVisitor = new ReducerModuleVisitor();
    const sagaModuleVisitor = new SagaModuleVisitor();

    const build = new ModuleBuilder()
        .addModule(module)
        .addModuleVisitor(reducerModuleVisitor)
        .addModuleVisitor(sagaModuleVisitor)
        .build();

    const reducer = reducerModuleVisitor.createReducer();
    const saga = sagaModuleVisitor.createSaga();
    const sagaMiddleware = createSagaMiddleware();

    middlewares.push(sagaMiddleware);

    const store = createStore(
        reducer,
        applyMiddleware(...middlewares)
    );

    sagaMiddleware.run(saga);

    return store;
}