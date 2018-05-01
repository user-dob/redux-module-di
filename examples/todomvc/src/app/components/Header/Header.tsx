import * as React from 'react';

import { TodoTextInput } from '../TodoTextInput';

interface IHeaderProps {
  addTodo: (text: string) => any;
};

export class Header extends React.Component<IHeaderProps> {
  handleSave(text: string) {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <TodoTextInput
          newTodo
          onSave={this.handleSave.bind(this)}
          placeholder="What needs to be done?" />
      </header>
    );
  }
}