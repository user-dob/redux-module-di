import { ReModule } from "./annotation/ReModule";
import { Module } from "./Module";
import { ModuleBuilder } from "./ModuleBuilder";
import { IModuleProps, IReducerModuleProps, ISagaModuleProps } from "./interfaces/interfaces";

type ModuleProps = IModuleProps & IReducerModuleProps & ISagaModuleProps;

export class TestModuleBuilder {
    public static build(moduleProps: ModuleProps): Module {
        
        @ReModule({
            name: "test",
            ...moduleProps
        })
        class TestModule {}

        return new ModuleBuilder()
            .addModule(TestModule)
            .build();
    }
}
