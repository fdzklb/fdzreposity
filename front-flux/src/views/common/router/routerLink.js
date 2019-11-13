import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../baseView';

/**
 * Router Link
 */
class RouterLink extends BaseView {

  /**
   * render
   * @returns {object} jsx
   */
  render() {
    const { eventType, params } = this.props;

    return (
      <div onClick={() => this.handleEvent(eventType, params)}>
        {this.props.children}
      </div>
    );
  }

}

RouterLink.propTypes = {
  eventType: PropTypes.string,
  params: PropTypes.object,
};

RouterLink.defaultProps = {
  eventType: '',
  params: {},
};

export default RouterLink;
