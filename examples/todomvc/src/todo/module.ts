import { ReModule } from '../../../../src';
import { TodoActions } from './actions';
import { TodoReducerService } from './reducers';
import { TodoService } from './services';

@ReModule({
    name: 'todo',
    exports: [
        TodoActions
    ],
    reducers: [
        TodoReducerService
    ],
    providers: [
        TodoService
    ]
})
export class TodoModule {}