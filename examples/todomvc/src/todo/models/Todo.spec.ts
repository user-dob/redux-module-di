import { expect } from 'chai';
import { Todo, ITodo } from './Todo';

describe('Todo', () => {
    it ('new Todo', () => {
        const todo = new Todo({id: '1', text: ''});
        expect(todo.id).to.be.eql('1');
        expect(todo.text).to.be.eql('');
        expect(todo.completed).to.be.eql(false);
    })
})