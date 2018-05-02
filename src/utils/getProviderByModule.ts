import { Type } from "../interfaces/type";
import { getModule } from "./getModule";

export const getProviderByModule = (target: Type<any>, provider: Type<any>): any => {
    const module = getModule(target);
    if (!module) {
        throw new Error(`${target.name} is not a module.`); 
    }

    return module.getProvider(provider);
};
