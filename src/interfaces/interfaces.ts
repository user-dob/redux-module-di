import { Reducer } from 'redux';
import { Effect } from 'redux-saga';
import { Container } from 'inversify';
import { ReactNode } from 'react';
import { Type } from './type';

export interface IAction {
    type: string;
    payload?: any;
}

export interface IReducerService {
    name: string;
    reducer: Reducer<any>;
}

export interface ISagaService {
    effects: () => Effect[];
}

export interface IClassProvider {
    provide: any;
    useClass: Type<any>;
}

export interface IValueProvider {
    provide: any;
    useValue: any;
}

export interface IContainerProvider {
    provide: any;
    useContainer: (container: Container) => void;
}

export type Provider = Type<any> | IClassProvider | IValueProvider | IContainerProvider; 

export interface IReducerModuleProps {
    reducers?: Type<IReducerService>[];
}

export interface ISagaModuleProps {
    sagas?: Type<ISagaService>[];
}

export interface IModuleProps {
    name: string;
    imports?: Type<any>[];
    exports?: Type<any>[];
    providers?: Provider[];
    components?: Type<any>[]; 
    bootstrap?: ReactNode;
}

export type ModuleProps = IModuleProps & IReducerModuleProps & ISagaModuleProps;