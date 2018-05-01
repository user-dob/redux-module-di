import { injectable } from 'inversify';
import { bindActionCreators } from 'redux'
import { IConnectService, IAction } from '../../../../../../src';
import { TodoActions } from '../../../todo';

@injectable()
export class AppConnectService implements IConnectService {
    constructor(
        private todoActions: TodoActions
    ) { }

    mapStateToProps(state: any) {
        return {
            todos: state.todos
        }
    }

    mapDispatchToProps(dispatch: any) {
        return {
            actions: bindActionCreators<IAction, any>(this.todoActions, dispatch)
        }
    }
}

