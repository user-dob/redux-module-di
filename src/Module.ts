import { ReactNode } from 'react';
import { Container } from 'inversify';
import { Type, isType } from './interfaces/type';
import { ModuleProps, Provider, IReducerService, ISagaService } from './interfaces/interfaces';
import { IModuleVisitor } from './visitors/IModuleVisitor';
import { MODULE_METADATA_KEY } from './annotation/module';

export class Module {
    private props: ModuleProps;
    private container: Container;
    private target: Type<any>;

    constructor(target: Type<any>) {
        this.target = target;
        this.props = Reflect.getMetadata(MODULE_METADATA_KEY, target);
        if (!this.props) {
            throw new Error(`Missing required @module annotation in: ${target.name}.`) 
        }
        this.container = new Container({defaultScope: 'Singleton'});
    }

    resolve(): Type<any> {
        const providers: any[] = [].concat(
            [this.target],
            this.exports,
            this.reducers,
            this.sagas,
            this.providers
        )

        providers.forEach(provider => this.setProvider(provider));

        return this.container.resolve(this.target);
    }

    getProvider(provider: Type<any>): any {
        return this.container.get(provider);
    }

    setProvider(provider: Provider): any {
        if (isType(provider)) {
            provider = { provide: provider, useClass: provider };
        }        

        const { provide } = provider;

        if (this.container.isBound(provide)) {
            return
        }    

        if ('useClass' in provider) {
            return this.container.bind(provide).to(provider.useClass);
        }

        if ('useValue' in provider) {
            return this.container.bind(provide).toConstantValue(provider.useValue);
        }

        if ('useContainer' in provider) {
            return provider.useContainer(this.container);
        }
    }

    accept(visitor: IModuleVisitor): void {
        visitor.visit(this);
    }

    get name(): string {
        return this.props.name;
    }

    get reducers(): Type<IReducerService>[] {
        return this.props.reducers || [];
    }

    get sagas(): Type<ISagaService>[] {
        return this.props.sagas || [];
    }

    get imports(): Type<any>[] {
        return this.props.imports || [];
    }

    get exports(): Type<any>[] {
        return this.props.exports || [];
    }

    get providers(): Provider[] {
        return this.props.providers || [];
    } 

    get components(): Type<any>[] {
        return this.props.components || [];
    }  

    get bootstrap(): any {
        return this.props.bootstrap;
    }
}