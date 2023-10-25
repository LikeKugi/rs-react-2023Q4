import './App.css';
import { Component } from 'react';
import {
  getDataFromStorage,
  setDataToLocalStorage,
} from '@/services/localStorageServices';
import Form from '@/components/Form/Form';

interface IAppState {
  toThrow: boolean;
  query: string;
}

class App extends Component<object, IAppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      toThrow: false,
      query: '',
    };
    this.throwError = this.throwError.bind(this);
    this.handleThrow = this.handleThrow.bind(this);
    this.changeQuery = this.changeQuery.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  public componentDidUpdate() {
    if (this.state.toThrow) {
      this.throwError();
    }
  }

  public componentDidMount() {
    const queryObject = getDataFromStorage();
    if (queryObject.query !== this.state.query) {
      this.setState((prev) => ({
        ...prev,
        query: queryObject.query,
      }));
    }
  }

  throwError() {
    throw new Error('Error');
  }

  handleThrow() {
    this.setState({ toThrow: true });
  }

  changeQuery(arg: string) {
    console.log(arg);
    this.setState((prev) => ({
      ...prev,
      query: arg,
    }));
  }

  handleSubmitForm(query: string) {
    console.log(query);
    setDataToLocalStorage({ query });
  }

  public render() {
    return (
      <div>
        <h1>Hello world!</h1>
        <Form
          query={this.state.query}
          handleChangeQuery={this.changeQuery}
          handleSubmit={this.handleSubmitForm}
        />
        <button onClick={this.handleThrow}>Throw</button>
      </div>
    );
  }
}

export default App;
