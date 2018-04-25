import { ReModule } from '../../../../src';
import { TodoActions, todoActions } from './actions';
import { TodoReducerService } from './reducers';
import { TodoService } from './services';

@ReModule({
    name: 'todo',
    reducers: [
        TodoReducerService
    ],
    providers: [
        {provide: TodoActions, useValue: todoActions},
        TodoService
    ]
})
export class TodoModule {}