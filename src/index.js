// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './App';
import './index.css';
import articleStore from './store/article-store';

ReactDOM.render(
  <Provider articleStore={articleStore}>
    <BrowserRouter>
      <Switch>
        <App />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
