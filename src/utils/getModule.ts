import { Module, LINK_ON_MODULE_KEY } from "../Module";
import { Type } from "../interfaces/type";

export const getModule = (target: Type<any>): Module | null => {
    return Reflect.getMetadata(LINK_ON_MODULE_KEY, target) as Module;
}