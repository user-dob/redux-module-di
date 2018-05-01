import { injectable } from 'inversify';
import { IConnectService } from '../../../../../../src';
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

    mapDispatchToProps() {
        return {
            actions: this.todoActions,
        }
    }
}
