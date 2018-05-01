import * as React from 'react';
import { ReConnect } from '../../../../../../src';
import { AppConnectService } from './AppConnectService';
import { Header } from '../../components/Header';
import { TodoActions } from '../../../todo';

interface IAppProps {
    actions: TodoActions
};

@ReConnect(AppConnectService)
export class App extends React.Component<IAppProps> {
    render() {
        const { actions } = this.props;

        return (
            <div className="todoapp">
                <Header addTodo={actions.addTodo} />
            </div>
        )
    }
} 
