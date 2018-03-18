import { Module } from './Module';
import { Type } from './interfaces/type';
import { IModuleVisitor } from './visitors/IModuleVisitor';

export class ModuleBuilder {
    private modules: Map<string, Module>;
    private visitors: IModuleVisitor[] = [];
    private target: Type<any>;

    constructor() {
        this.modules = new Map();
        this.visitors = [];
    }

    addModule(target: Type<any>): ModuleBuilder {
        this.target = target;
        return this;
    }

    addModuleVisitor(visitor: IModuleVisitor): ModuleBuilder {
        this.visitors.push(visitor);
        return this;
    }

    visit(module: Module): void {
        this.visitors.forEach(visitor => visitor.visit(module));
    }

    initModule(target: Type<any>): Module {
        let module = new Module(target);

        if (this.modules.has(module.name)) {
            return this.modules.get(module.name);
        }

        this.modules.set(module.name, module);

        module.imports.forEach(item => {
            let importModule = this.initModule(item);
            importModule.exports.forEach(item => {
                module.setProvider({
                    provide: item,
                    useContainer: container => {
                        container.bind(item).toConstantValue(importModule.getProvider(item))
                    }
                })
            })
        });

        module.components.forEach((component: any) => {
            component.module = module
        })

        module.resolve();

        return module;
    }

    build(): Module {
        const module = this.initModule(this.target);

        this.modules.forEach(module => {
            this.visit(module);            
        });

        return module;
    }
}