import { Component, FormEvent, ReactNode } from 'react';
import styles from './Form.module.scss';

interface IFormProps {
  query: string;
  handleChangeQuery: (arg: string) => void;
  handleSubmit: (arg: string) => void;
}

class Form extends Component<IFormProps, object, ReactNode> {
  constructor(props: IFormProps) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
    this.resetFormHandler = this.resetFormHandler.bind(this);
  }

  submitHandler(e: FormEvent) {
    e.preventDefault();
    this.props.handleSubmit(this.props.query);
  }

  resetFormHandler(e: FormEvent) {
    e.preventDefault();
    this.props.handleChangeQuery('');
    this.props.handleSubmit('');
  }

  public render() {
    return (
      <form
        className={styles.form}
        onSubmit={this.submitHandler}
        onReset={this.resetFormHandler}
      >
        <label htmlFor="queryInput">Query: </label>
        <input
          className={styles.form__input}
          type="text"
          value={this.props.query}
          onChange={(e) => this.props.handleChangeQuery(e.target.value)}
          id={'queryInput'}
        />
        <button type="submit">Search</button>
        <button type="reset">Reset</button>
      </form>
    );
  }
}

export default Form;
