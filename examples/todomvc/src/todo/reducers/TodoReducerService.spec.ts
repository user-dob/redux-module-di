import { expect } from 'chai';
import { TestModuleBuilder, IAction } from '../../../../../src';
import { TodoReducerService } from './TodoReducerService';
import { TodoActions } from '../actions';
import { TodoService } from '../services';

describe('TodoReducerService', () => {

    let todoReducerService: TodoReducerService;
    let todoActions: TodoActions;

    beforeEach(() => {
        const module = TestModuleBuilder.build({
            reducers: [
                TodoReducerService
            ],
            providers: [
                TodoService,
                TodoActions
            ]
        });
    
        todoReducerService = module.getProvider(TodoReducerService);
        todoActions = module.getProvider(TodoActions);
    })

    it ('should handle initial state', () => {
        expect(todoReducerService.reducer(undefined, {} as IAction)).to.be.eql([]);
    })

    it ('should handle ADD_TODO', () => {
        const state = todoReducerService.reducer([], todoActions.addTodo('test'));
        expect(state[0].text).to.be.eql('test');
        expect(state[0].completed).to.be.eql(false);
    })

})