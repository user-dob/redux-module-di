import { Record } from 'immutable';

export interface ITodo {
    id: string;
    text: string;
    completed: boolean;
}

export const TodoRecord = Record({
    id: '',
    text: '',
    completed: false
})

export class Todo extends TodoRecord implements ITodo {
    id: string;
    text: string;
    completed: boolean;

    constructor(id: string, text: string) {
        super({id, text});
    }
}
