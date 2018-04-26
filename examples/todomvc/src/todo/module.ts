import { ReModule } from '../../../../src';
import { TodoActions } from './actions';
import { TodoReducerService } from './reducers';
import { TodoService } from './services';

@ReModule({
    name: 'todo',
    reducers: [
        TodoReducerService
    ],
    providers: [
        TodoActions,
        TodoService
    ]
})
export class TodoModule {}