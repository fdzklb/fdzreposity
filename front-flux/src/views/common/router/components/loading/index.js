import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../../../baseView';

import styles from './style.scss';

/**
 * Loading Component
 */
class Loading extends BaseView {

  /**
   * render
   * @returns {object} jsx
   */
  render() {
    const { height, text, isLoading, children, style } = this.props;

    return (
      <div className={`${styles.loading}`} style={{ height, ...style }}>
        <div
          className={`${styles.logo} ${!isLoading ? styles.loading_hide : ''}`}
        >
          <img
            src={require('../../../../../assets/images/loading.svg')}
            alt="loading"
            width="50"
          />
          {text}
        </div>
        <div
          className={`${isLoading ? styles.mark : ''} ${
            !children ? styles.loading_hide : ''
          }`}
        >
          {children}
        </div>
      </div>
    );
  }

}

Loading.propTypes = {
  height: PropTypes.string,
  text: PropTypes.string,
  isLoading: PropTypes.bool,
  style: PropTypes.object,
};

Loading.defaultProps = {
  height: 'auto',
  text: '',
  isLoading: true,
  style: {},
};

export default Loading;
