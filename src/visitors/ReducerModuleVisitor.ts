import { ReducersMapObject, combineReducers, Reducer } from 'redux';
import { IModuleVisitor } from './IModuleVisitor';
import { Module } from '../Module';

export class ReducerModuleVisitor implements IModuleVisitor {
    private reducersMap: ReducersMapObject;
    
    constructor() {
        this.reducersMap = {};
    }

    visit(module: Module): void {
        module.reducers
            .map(item => module.getProvider(item))
            .forEach(provider => {
                this.reducersMap[provider.name] = provider.reducer.bind(provider);            
            });
    }

    createReducer(): Reducer<any> {
        return combineReducers(this.reducersMap);
    }
}