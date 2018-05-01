import { ReModule } from '../../../../src';
import { LogModule } from '../log';
import { TodoModule } from '../todo';
import { App, AppConnectService } from './containers/App';

@ReModule({
    name: 'app',
    imports: [
        LogModule,
        TodoModule
    ],
    providers: [
        AppConnectService
    ],
    components: [
        App
    ],
    bootstrap: App
})
export class AppModule {}
