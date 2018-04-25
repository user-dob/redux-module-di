import { expect } from 'chai';
import { TestModuleBuilder, IAction } from '../../../../../src';
import { TodoReducerService } from './TodoReducerService';
import { TodoActions, todoActions } from '../actions';
import { TodoService } from '../services';

describe('TodoReducerService', () => {

    let todoReducerService: TodoReducerService;

    beforeEach(() => {
        const module = TestModuleBuilder.build({
            reducers: [
                TodoReducerService
            ],
            providers: [
                {provide: TodoActions, useValue: todoActions},
                TodoService
            ]
        });
    
        todoReducerService = module.getProvider(TodoReducerService);
    })
	
	TestModuleBuilder.build({
		reducers: [
			TodoReducerService
		],
		providers: [
			{provide: TodoActions, useValue: todoActions},
			TodoService
		]
	})

    it ('should handle initial state', () => {
        expect(todoReducerService.reducer(undefined, {} as IAction)).to.be.eql([]);
    })

})