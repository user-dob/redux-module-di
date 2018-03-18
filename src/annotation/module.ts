import { injectable } from 'inversify';
import { Type } from '../interfaces/type';
import { ModuleProps } from '../interfaces/interfaces';

export const MODULE_METADATA_KEY = Symbol.for('redux.di/ModuleProps');

export const module = (props: ModuleProps) => {
    return (target: Type<any>) => {
        target = injectable()(target);
        Reflect.defineMetadata(MODULE_METADATA_KEY, props, target);
    }
}