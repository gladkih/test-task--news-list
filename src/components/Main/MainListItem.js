// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import './main-item.css';

type Props = {
  article: {
    title: string,
  },
  number: number,
};

type State = {};

/**
 * Рендер новости в списке
 */
class MainListItem extends React.Component<Props, State> {
  render() {
    const { article, number } = this.props;
    return (
      <li className="main--item">
        <span className="main--item-title">{article.title}</span>
        <Link to={`/news/${number}`} className="main--item-link">read more →</Link>
      </li>
    );
  }
}

export default MainListItem;
