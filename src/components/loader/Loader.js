import React from 'react';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import './loader.css';

/**
 * Отображения лоадера
 * @param show boolean — флаг отображения лоадера
 * @returns {*}
 * @constructor
 */
const Loader = ({ show }) => {
  if (show) {
    return (
      <div className="loader-wrapper">
        <CircularProgress size={50} />
      </div>
    );
  }
  return <div />;
};

export default Loader;
