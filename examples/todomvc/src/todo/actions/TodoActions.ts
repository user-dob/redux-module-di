import { injectable } from 'inversify';
import { IAction } from '../../../../../src';
import { ITodo, TodoFilters } from '../models';

@injectable()
export class TodoActions {
    static readonly ADD_TODO = 'ADD_TODO';
    static readonly DELETE_TODO = 'DELETE_TODO';
    static readonly EDIT_TODO = 'EDIT_TODO';
    static readonly COMPLETE_TODO = 'COMPLETE_TODO';
    static readonly COMPLETE_ALL_TODOS = 'COMPLETE_ALL_TODOS';
    static readonly CLEAR_COMPLETED = 'CLEAR_COMPLETED';
    static readonly SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

    addTodo = (todo: ITodo): IAction => ({
        type: TodoActions.ADD_TODO,
        payload: {todo}
    })

    deleteTodo = (todo: ITodo): IAction => ({
        type: TodoActions.DELETE_TODO,
        payload: {todo}
    }) 

    editTodo = (todo: ITodo): IAction => ({
        type: TodoActions.EDIT_TODO,
        payload: {todo}
    }) 

    completeTodo = (todo: ITodo): IAction => ({
        type: TodoActions.COMPLETE_TODO,
        payload: {todo}
    }) 

    completeAllTodos = (): IAction => ({
        type: TodoActions.COMPLETE_ALL_TODOS
    }) 

    clearCompleted = (): IAction => ({
        type: TodoActions.CLEAR_COMPLETED
    }) 

    setVisibilityFilter = (filter: TodoFilters): IAction => ({
        type: TodoActions.SET_VISIBILITY_FILTER,
        payload: {filter}
    }) 
}