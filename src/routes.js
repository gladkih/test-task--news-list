// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './components/Main/Main';
import News from './components/News/News';

import articleStore from './store/article-store';
// Рутинг приложения
const AppRoutes = () => (
  <Switch>
    <Route path="/news/:id" render={() => <News store={articleStore} />} />
    <Route path="/news-list/" render={() => <Main store={articleStore} />} />
  </Switch>
);

export default AppRoutes;
