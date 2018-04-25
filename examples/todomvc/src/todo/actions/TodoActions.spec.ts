import { expect } from 'chai';
import { TodoActions, todoActions } from './TodoActions';
import { Todo } from '../models';

describe('TodoActions', () => {
    it('addTodo should create ADD_TODO action', () => {
        const todo = new Todo(1, ''); 
        expect(todoActions.addTodo(todo)).to.be.eql({
            type: TodoActions.ADD_TODO,
            payload: {todo}
        });
    })

    it('deleteTodo should create DELETE_TODO action', () => {
        const todo = new Todo(1, ''); 
        expect(todoActions.deleteTodo(todo)).to.be.eql({
            type: TodoActions.DELETE_TODO,
            payload: {todo}
        });
    })

    it('editTodo should create EDIT_TODO action', () => {
        const todo = new Todo(1, ''); 
        expect(todoActions.editTodo(todo)).to.be.eql({
            type: TodoActions.EDIT_TODO,
            payload: {todo}
        });
    })

    it('completeTodo should create COMPLETE_TODO action', () => {
        const todo = new Todo(1, ''); 
        expect(todoActions.completeTodo(todo)).to.be.eql({
            type: TodoActions.COMPLETE_TODO,
            payload: {todo}
        });
    })

    it('completeAll should create COMPLETE_ALL action', () => {
        expect(todoActions.completeAllTodos()).to.be.eql({
            type: TodoActions.COMPLETE_ALL_TODOS
        });
    })

    it('clearCompleted should create CLEAR_COMPLETED action', () => {
        expect(todoActions.clearCompleted()).to.be.eql({
            type: TodoActions.CLEAR_COMPLETED
        });
    })
})