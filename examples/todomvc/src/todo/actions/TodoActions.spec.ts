import { expect } from 'chai';
import { TestModuleBuilder } from '../../../../../src';
import { TodoActions } from './TodoActions';
import { Todo } from '../models';

describe('TodoActions', () => {

    let todoActions: TodoActions;

    beforeEach(() => {
        const module = TestModuleBuilder.build({
            providers: [
                TodoActions
            ]
        });
    
        todoActions = module.getProvider(TodoActions);
    })

    it('addTodo should create ADD_TODO action', () => {
        expect(todoActions.addTodo('test')).to.be.eql({
            type: TodoActions.ADD_TODO,
            payload: {text: 'test'}
        });
    })

    it('deleteTodo should create DELETE_TODO action', () => {
        expect(todoActions.deleteTodo(1)).to.be.eql({
            type: TodoActions.DELETE_TODO,
            payload: {id: 1}
        });
    })

    it('editTodo should create EDIT_TODO action', () => {
        expect(todoActions.editTodo(1, 'test')).to.be.eql({
            type: TodoActions.EDIT_TODO,
            payload: {id: 1, text: 'test'}
        });
    })

    it('completeTodo should create COMPLETE_TODO action', () => {
        expect(todoActions.completeTodo(1)).to.be.eql({
            type: TodoActions.COMPLETE_TODO,
            payload: {id: 1}
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