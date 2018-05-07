import { Record } from 'immutable';

export interface ITodo {
    readonly id: string;
    readonly text: string;
    readonly completed?: boolean;
}

export const TodoRecord = Record({
    id: '',
    text: '',
    completed: false
})

export class Todo extends TodoRecord implements ITodo {
    public readonly id: string;
    public readonly text: string;
    public readonly completed: boolean;
    public constructor(values: ITodo) {
        super(values);
    }
}