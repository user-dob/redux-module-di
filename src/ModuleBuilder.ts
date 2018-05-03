import { Module } from "./Module";
import { Type } from "./interfaces/type";
import { IModuleVisitor } from "./visitors/IModuleVisitor";

export class ModuleBuilder implements IModuleVisitor {
    private modules: Map<string, Module>;
    private visitors: IModuleVisitor[] = [];
    private target: Type<any>;

    public constructor() {
        this.modules = new Map();
        this.visitors = [];
    }

    public addModule(target: Type<any>): ModuleBuilder {
        this.target = target;
        return this;
    }

    public addModuleVisitor(visitor: IModuleVisitor): ModuleBuilder {
        this.visitors.push(visitor);
        return this;
    }

    public visit(module: Module): void {
        this.visitors.forEach(visitor => visitor.visit(module));
    }

    public initModule(target: Type<any>): Module {
        const module = Module.getModule(target) || new Module(target);

        if (this.modules.has(module.name)) {
            return this.modules.get(module.name) as Module;
        }

        this.modules.set(module.name, module);

        module.imports.forEach(item => {
            const importModule = this.initModule(item);
            importModule.exports.forEach(provide => {
                module.setProvider({
                    provide,
                    useContainer: container => {
                        container.bind(provide).toConstantValue(importModule.getProvider(provide));
                    }
                });
            });
        });

        module.components.forEach((component: any) => {
            component.module = module;
        });

        module.resolve();

        return module;
    }

    public build(): Module {
        const module = this.initModule(this.target);

        this.modules.forEach(item => this.visit(item));

        return module;
    }
}
