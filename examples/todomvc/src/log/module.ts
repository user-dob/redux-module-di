import { ReModule } from '../../../../src';
import { LogService } from './services';

@ReModule({
    name: 'log',
    exports: [
        LogService        
    ],
})
export class LogModule {}