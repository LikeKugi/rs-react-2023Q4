import { Component } from 'react';
import styles from './FallBack.module.scss';

interface IFallBackProps {
  btnHandler: () => void;
}

class FallBack extends Component<IFallBackProps> {
  constructor(props: IFallBackProps) {
    super(props);
  }
  public render() {
    return (
      <div className={styles.fallback}>
        <h1>Something went wrong.</h1>
        <button onClick={this.props.btnHandler}>Remove error</button>
      </div>
    );
  }
}
export default FallBack;
