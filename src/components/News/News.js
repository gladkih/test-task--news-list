// @flow
import React from 'react';
import { Helmet } from 'react-helmet';

import { withRouter } from 'react-router-dom';

import './news.css';

type Props = {
  match: Object,
  store: Object,
  history: Object,
};

type State = {};

/**
 * Компонент для отображения выбранной новости
 */
class News extends React.Component<Props, State> {
  componentWillMount() {
    if (!this.props.store.articles.length) {
      // если хранилище с новостями пустое, то редиектим на главную страницу
      this.props.history.push('/');
    }
  }

  render() {
    const { store } = this.props;
    const { id } = this.props.match.params;
    const selectedNews = store.articles[id];
    if (selectedNews) {
      return (
        <article className="news">
          <Helmet>
            {selectedNews.title && <title>{selectedNews.title}</title>}
          </Helmet>
          {selectedNews.title && <h1 className="news--title">{selectedNews.title}</h1> }
          {selectedNews.urlToImage &&
          <img
            src={selectedNews.urlToImage}
            alt={selectedNews.title}
            title={selectedNews.title}
            className="news--image"
          />
          }
          {selectedNews.description && <section className="news--description">{selectedNews.description}</section>}
          {selectedNews.url && <footer className="news--footer">URL: {selectedNews.url}</footer>}
        </article>
      );
    }
    return <div />;
  }
}

export default withRouter(News);
