export interface ITodo {
    id?: number;
    text: string;
    completed: boolean;
}

export class Todo implements ITodo {
    id: number;
    text: string;
    completed: boolean;

    constructor(id: number, text: string) {
        this.id = id;
        this.text = text;
        this.completed = false;
    }
}