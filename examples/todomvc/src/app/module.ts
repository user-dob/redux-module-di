import { ReModule } from '../../../../src';
import { LogModule } from '../log';
import { TodoModule } from '../todo';

@ReModule({
    imports: [
        LogModule,
        TodoModule
    ],
    name: 'app'
})
export class AppModule {}