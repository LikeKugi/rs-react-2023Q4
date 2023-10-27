import { Component } from 'react';
import styles from './Header.module.scss';

interface IHeaderProps {
  handleThrow: () => void;
}

class Header extends Component<IHeaderProps> {
  constructor(props: IHeaderProps) {
    super(props);
  }
  public render() {
    return (
      <header className={styles.header}>
        <div className={styles.header__container}>
          <h3>Rs School React App</h3>
          <button
            className={styles.header__btn}
            onClick={this.props.handleThrow}
          >
            Throw Error
          </button>
        </div>
      </header>
    );
  }
}
export default Header;
