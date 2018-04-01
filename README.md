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

        public reducer(state: any, action: any): any {
            // some reducer
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
