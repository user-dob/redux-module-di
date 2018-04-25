export interface ITodo {
    id: string;
    text: string;
    completed: boolean;
}

export class Todo implements ITodo {
    id: string;
    text: string;
    completed: boolean;

    constructor(id: string, text: string) {
        this.id = id;
        this.text = text;
        this.completed = false;
    }
}