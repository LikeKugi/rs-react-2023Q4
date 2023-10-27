import { Component } from 'react';
import {
  getDataFromStorage,
  setDataToLocalStorage,
} from '@/services/localStorageServices';
import Form from '@/components/Form/Form';
import { fetchData } from '@/api/api';
import { ApiConstants } from '@/api/api.constants';
import { IArtwork } from '@/types/api/IArtwork';
import { IBaseTypeResponse } from '@/types/api/types';
import Header from '@/components/Header/Header';
import CardList from '@/components/CardList/CardList';
import styles from './App.module.scss';

interface IAppState {
  toThrow: boolean;
  query: string;
  limit: number;
  page: number;
  artworks: IArtwork[];
}

class App extends Component<object, IAppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      toThrow: false,
      query: '',
      limit: 8,
      page: 1,
      artworks: [],
    };
    this.throwError = this.throwError.bind(this);
    this.handleThrow = this.handleThrow.bind(this);
    this.changeQuery = this.changeQuery.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.placeArtWorksData = this.placeArtWorksData.bind(this);
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
    const params = new URLSearchParams({
      limit: `${this.state.limit}`,
      page: `${this.state.page}`,
    });
    (
      fetchData(
        `${ApiConstants.BASE}${ApiConstants.ARTWORKS}?${params}`,
      ) as Promise<IBaseTypeResponse>
    )
      .then((a) => {
        this.placeArtWorksData(a.data);
      })
      .catch((e) => console.log(e));
  }

  placeArtWorksData(data: IArtwork[]) {
    this.setState((prevState) => ({
      ...prevState,
      artworks: data,
    }));
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
      <div className={styles.content}>
        <Header handleThrow={this.handleThrow} />
        <div className={styles.content__base}>
          <Form
            query={this.state.query}
            handleChangeQuery={this.changeQuery}
            handleSubmit={this.handleSubmitForm}
          />
          {!!this.state.artworks.length && (
            <CardList cards={this.state.artworks} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
