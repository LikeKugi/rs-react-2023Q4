import './App.css';
import { Component } from 'react';

class App extends Component<object, { toThrow: boolean }> {
  constructor(props: object) {
    super(props);
    this.state = {
      toThrow: false,
    };
    this.throwError = this.throwError.bind(this);
    this.handleThrow = this.handleThrow.bind(this);
  }

  public componentDidUpdate() {
    if (this.state.toThrow) {
      this.throwError();
    }
  }

  throwError() {
    throw new Error('Error');
  }

  handleThrow() {
    this.setState({ toThrow: true });
  }

  public render() {
    return (
      <div>
        <h1>Hello world!</h1>
        <button onClick={this.handleThrow}>Throw</button>
      </div>
    );
  }
}

export default App;
