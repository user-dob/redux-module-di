import { ReModule } from '../../../../src';
import { LogModule } from '../log';
import { TodoModule } from '../todo';
import { App } from './components/App';

@ReModule({
    name: 'app',
    imports: [
        LogModule,
        TodoModule
    ],
    bootstrap: App    
})
export class AppModule {}