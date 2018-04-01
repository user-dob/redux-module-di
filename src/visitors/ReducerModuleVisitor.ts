import { ReducersMapObject, combineReducers, Reducer } from "redux";
import { IModuleVisitor } from "./IModuleVisitor";
import { Module } from "../Module";

export class ReducerModuleVisitor implements IModuleVisitor {
    private reducersMap: ReducersMapObject;
    
    public constructor() {
        this.reducersMap = {};
    }

    public visit(module: Module): void {
        module.reducers
            .map(item => module.getProvider(item))
            .forEach(provider => {
                this.reducersMap[provider.name] = provider.reducer.bind(provider);            
            });
    }

    public createReducer(): Reducer<any> {
        return combineReducers(this.reducersMap);
    }
}
