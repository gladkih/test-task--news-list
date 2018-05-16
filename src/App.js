// @flow
import React from 'react';
import { Helmet } from 'react-helmet';
import moment from 'moment/moment';

import { withRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import AppRoutes from './routes';
import articleStore from './store/article-store';
//
import './app.css';
import './components/style/title.css';

/**
 * Корневой элемент
 * @returns {*}
 * @constructor
 */
const App = () => (
  <section className="app">
    <Helmet>
      <title>News of {moment(new Date()).format('DD/MM/YY')}</title>
    </Helmet>
    <div className="main">
      <Header stores={articleStore} />
      <AppRoutes />
    </div>
  </section>
);

export default withRouter(App);
