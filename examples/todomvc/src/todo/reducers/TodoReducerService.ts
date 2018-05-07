import { injectable } from 'inversify';
import { List } from 'immutable';
import { IReducerService, IAction } from '../../../../../src';
import { ITodo } from '../models';
import { TodoActions } from '../actions';
import { TodoService } from '../services';

export interface ITodoState extends Array<ITodo> {}

@injectable()
export class TodoReducerService implements IReducerService {
    name = 'todos';

    constructor(
        private todoService: TodoService
    ) {}

    reducer(state: ITodoState = [], {type, payload}: IAction): ITodoState {
        switch (type) {
            case TodoActions.ADD_TODO:
                return [
                    ...state,
                    this.todoService.createTodo(payload.text)
                ];

            default:
                return state;
        }        
    }
}