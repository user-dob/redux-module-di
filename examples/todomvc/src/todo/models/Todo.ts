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
    constructor(
        public id: string,
        public text: string,
        public completed: boolean = false
    ) {
        super({id, text, completed});
    }
}
