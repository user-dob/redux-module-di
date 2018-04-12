# redux-module-di

Module decorator to connect redux with inversify.

## Installation

* `npm install --save redux-module-di`

## Installation (typescript)

* in `tsconfig.json` set 
```json
"compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "types": ["reflect-metadata"]
}
```

## @ReModule() decorator

```ts
    import { injectable } from "inversify";
    import { ReModule, IReducerService, bootstrapModule } from "redux-module-di";

    @injectable()
    class Provider {}

    @injectable()
    class AppReducerService implements IReducerService {
        public name = "app";

        public constructor(private provider: Provider) {}

        // some reducer
        public reducer(state: any, action: any): any {
            return state;
        }
    }

    @ReModule({
        name: "app",
        reducers: [
            AppReducerService
        ],
        providers: [
            Provider
        ]
    })
    class AppModule {}

    bootstrapModule(AppModule, document.getElementById('app') as HTMLElement)
```

## @ReComponent() decorator

```ts
    import { injectable } from "inversify";
    import { ReComponent, component } from "redux-module-di";

    @injectable()
    class Provider {}

    @ReComponent()
    class AppComponent extends React.Component<any, any> {
        public constructor(props: any, context: any, private provider: Provider) {
            super(props, context);
        }

        public render() {
            return null;
        }
    }

    @ReModule({
        name: "app",
        components: [
            AppComponent
        ],
        providers: [
            Provider
        ]
    })
    class AppModule {}
```

