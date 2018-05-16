// @flow
import React from 'react';
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
    <div className="main">
      <Header stores={articleStore} />
      <AppRoutes />
    </div>
  </section>
);

export default withRouter(App);
