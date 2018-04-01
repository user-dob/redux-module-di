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

## @module() decorator

```ts
    import { injectable } from "inversify";
    import { module, IReducerService, bootstrapModule } from "redux-module-di";

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

    @module({
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

## @component() decorator

```ts
    import { injectable } from "inversify";
    import { module, component } from "redux-module-di";

    @injectable()
    class Provider {}

    @component()
    class AppComponent extends React.Component<any, any> {
        public constructor(props: any, context: any, private provider: Provider) {
            super(props, context);
        }

        public render() {
            return null;
        }
    }

    @module({
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

