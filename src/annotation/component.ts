import { Type } from "../interfaces/type";
import { Module } from "../Module";

export const component = () => {
    return (target: Type<any>): Type<any> => {
        const types = Reflect.getMetadata("design:paramtypes", target) || [];

        class Wrap extends target {
            public static module: Module;
            public constructor(props: any, context: any) {
                const providers = types.slice(2).map((provider: Type<any>) => Wrap.module.getProvider(provider)); 
                const args = [props, context, ...providers];
                super(...args);
            }
        }

        return Wrap;
    };
};
