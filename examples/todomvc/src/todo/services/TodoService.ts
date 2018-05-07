import { injectable } from 'inversify';
import { v1 as uuid } from 'uuid';
import { ITodo, Todo } from '../models';

@injectable()
export class TodoService {
    createTodo(text: string): ITodo {
        return new Todo({id: uuid(), text});
    }
}