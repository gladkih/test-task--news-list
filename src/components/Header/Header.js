// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import tinyUrlParams from 'tiny-url-params';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import DialogTitle from 'material-ui/Dialog/DialogTitle';
import DialogContent from 'material-ui/Dialog/DialogContent';
import articleStore from '../../store/article-store';
import Filter from '../filter/filter';

import './header.css';

type Props = {
  country: ?string,
  category: ?string,
  history: Object,
  location: Object,
};

type State = {
  articles: ?Array,
  country: string,
  category: string,
  open: boolean,
  error: ?string,
};
// апи для получения новостей
const API = 'b1d70bf42b0442f3a9120409bc9ea51a';
// список старн в фильтре
const countryArray = [
  { id: 'all', title: 'All' },
  { id: 'de', title: 'DE' },
  { id: 'ru', title: 'RU' },
  { id: 'us', title: 'US' },
];
// список категорий в фильтре
const categoryArray = [
  { id: 'all', title: 'All' },
  { id: 'business', title: 'Business' },
  { id: 'health', title: 'Health' },
  { id: 'technology', title: 'Technology' },
];

/**
 * Отображение фильтра
 */
class Header extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      country: this.props.country ? this.props.country : 'all',
      category: this.props.category ? this.props.category : 'all',
      open: false,
      error: '',
    };
  }

  componentDidMount() {
    if (this.props.location.search) {
      this.updateState(this.props.location.search);
    }
  }

  /**
   * устанавливаем состояния
   * @param path
   */
  updateState = (path) => {
    const params = tinyUrlParams(path);
    this.setState({
      country: params.country,
      category: params.category,
    });
    this.requestNews(params);
  };
  // обновляем фильтры
  changeFilterCountry = value => this.setState({ country: value });
  changeFilterCategory = value => this.setState({ category: value });

  /**
   * Получаем список новостей с сервера
   * @param args
   */
  requestNews = (args) => {
    const { country, category } = args && args.country ? args : this.state;
    const params = `country=${country}&category=${category}&apiKey=${API}&pageSize=20`;
    // устанавливаем статус обновления новостей
    articleStore.setUpdateState(true);
    fetch(`https://newsapi.org/v2/top-headlines?${params}`, {
      method: 'GET',
      mode: 'cors',
    })
      .then((response) => {
        if (!response.ok) {
          this.setState({ open: true, error: response.statusText });
          throw Error(response.statusText);
        }
        return response;
      })
      .then(resp => resp.json())
      .then((data) => {
        this.props.history.push(`/news-list?country=${country}&category=${category}`);
        if ({}.hasOwnProperty.call(data, 'articles')) {
          articleStore.addArticles(data.articles);
        }
        articleStore.setFilter({ country });
        articleStore.setFilter({ category });
        articleStore.setUpdateState(false);
      })
      .catch((error) => {
        this.setState({ open: true, error: 'Failed to fetch' });
        articleStore.setUpdateState(false);
      });
  };

  handleClose = () => this.setState({ open: false });

  /**
   * Отрисовываем модальное окно с ошибкой
   * @returns {*}
   */
  renderDialog = () => (
    <Dialog
      open={this.state.open}
      onClose={this.handleClose}
      aria-labelledby="simple-dialog-title"
    >
      <DialogTitle id="simple-dialog-title">Error</DialogTitle>
      <DialogContent>
        {this.state.error}
      </DialogContent>
    </Dialog>
  );

  render() {
    const day = new Date();
    return (
      <section className="header">
        {this.renderDialog()}
        <h1>Top news of {moment(day).format('DD')}, {moment(day).format('DD/MM/YY')}</h1>
        <Filter
          title="country"
          type={countryArray}
          onClick={this.changeFilterCountry}
          value={this.state.country}
        />
        <Filter
          title="category"
          type={categoryArray}
          onClick={this.changeFilterCategory}
          value={this.state.category}
        />
        <footer className="header-footer">
          <Button variant="raised" className="header--btn_center" onClick={this.requestNews}>New request</Button>
        </footer>
      </section>
    );
  }
}

export default withRouter(Header);
