// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import MainListItem from './MainListItem';
import Loader from '../loader/Loader';
import './main.css';

type Props = {
  store: Object,
};

type State = {};

const countryDict = {
  all: 'All countries',
  de: 'Germany',
  ru: 'Russia',
  us: 'USA',
};

const categoryDict = {
  all: 'All categories',
  business: 'Business',
  health: 'Health',
  technology: 'Technology',
};

/**
 * Список новостей
 */
@observer
class Main extends React.Component<Props, State> {
  @observable articles = [];
  @observable filters = {};

  /**
   * Отображения списка
   * @param store
   * @returns {*}
   */
  renderList = store => (
    <section className="main--news">
      <ol className="main--news-list">
        {store.articles.map((item, index) => <MainListItem key={index} article={item} number={index} />)}
      </ol>
    </section>
  );

  render() {
    const { store } = this.props;
    const country = countryDict[store.getFilter().country] || 'All countries';
    const category = categoryDict[store.getFilter().category] || 'All categories';
    return (
      <div>
        <h2>News from {country} and {category}</h2>
        {!store.updateArticles && store.articles.length > 0 && this.renderList(store)}
        {!store.updateArticles && store.articles.length === 0 && <span>No news</span>}
        <Loader show={store.updateArticles} />
      </div>
    );
  }
}

export default withRouter(Main);
