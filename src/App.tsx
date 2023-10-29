import { Component } from 'react';
import {
  getDataFromStorage,
  setDataToLocalStorage,
} from '@/services/localStorageServices';
import Form from '@/components/Form/Form';
import { fetchData } from '@/api/api';
import { ApiConstants } from '@/api/api.constants';
import { IArtwork } from '@/types/api/IArtwork';
import { IBaseTypeResponse, IFetchQueryParams } from '@/types/api/types';
import Header from '@/components/Header/Header';
import CardList from '@/components/CardList/CardList';
import styles from './App.module.scss';
import Loader from '@/components/Loader/Loader';
import { IQueryObject } from '@/types/appTypes';

interface IAppState {
  toThrow: boolean;
  query: string;
  limit: number;
  page: number;
  artworks: IArtwork[];
  loading: boolean;
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
      loading: true,
    };
    this.throwError = this.throwError.bind(this);
    this.handleThrow = this.handleThrow.bind(this);
    this.changeQuery = this.changeQuery.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.placeArtWorksData = this.placeArtWorksData.bind(this);
    this.fetchArtworks = this.fetchArtworks.bind(this);
  }

  public componentDidUpdate() {
    if (this.state.toThrow) {
      this.throwError();
    }
  }

  public componentDidMount() {
    const fallback: IQueryObject = {
      query: '',
    };
    const queryObject = getDataFromStorage(fallback) as IQueryObject;
    let query = this.state.query;
    if (queryObject.query !== query) {
      query = queryObject.query;
      this.setState((prev) => ({
        ...prev,
        loading: false,
        query,
      }));
    }
    this.fetchArtworks(query);
  }

  fetchArtworks(query: string) {
    const initialParamsObj: IFetchQueryParams = {
      limit: `${this.state.limit}`,
      page: `${this.state.page}`,
      fields: 'id,title,image_id,artist_title,date_start,date_end',
    };
    if (query) {
      initialParamsObj.q = query;
    }
    const params = new URLSearchParams(initialParamsObj);
    const basePath: string = query
      ? `${ApiConstants.BASE}${ApiConstants.ARTWORKS}/${ApiConstants.SEARCH}?${params}`
      : `${ApiConstants.BASE}${ApiConstants.ARTWORKS}?${params}`;
    (fetchData(basePath) as Promise<IBaseTypeResponse>)
      .then((a) => {
        this.placeArtWorksData(a.data);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        this.setState((prev) => ({
          ...prev,
          loading: false,
        }));
      });
  }

  placeArtWorksData(data: IArtwork[]) {
    this.setState((prevState) => ({
      ...prevState,
      artworks: data,
    }));
  }

  throwError() {
    throw new Error('Error was thrown buy user');
  }

  handleThrow() {
    this.setState({ toThrow: true });
  }

  changeQuery(arg: string) {
    this.setState((prev) => ({
      ...prev,
      query: arg,
    }));
  }

  handleSubmitForm(query: string) {
    this.setState((prev) => ({
      ...prev,
      loading: true,
    }));
    setDataToLocalStorage({ query });
    this.fetchArtworks(query);
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

          {this.state.loading && <Loader />}
          {!this.state.artworks.length && !this.state.loading && (
            <h1 className={styles.content__alert}>No artworks found here</h1>
          )}
          {!!this.state.artworks.length && (
            <CardList cards={this.state.artworks} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
