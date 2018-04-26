import { Module, LINK_ON_MODULE_KEY } from "./Module";
import { Type } from "./interfaces/type";

export const getProviderByModule = (target: Type<any>, provider: Type<any>): any => {
    const module = Reflect.getMetadata(LINK_ON_MODULE_KEY, target) as Module;
    if (!module) {
        throw new Error(`${target.name} is not a module.`); 
    }

    return module.getProvider(provider);
};
