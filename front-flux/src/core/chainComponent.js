import React from 'react';
import PropTypes from 'prop-types';

/**
 * Chain Component
 * @description to build the Chain of Responsibility
 */
class ChainComponent extends React.Component {

  static childContextTypes = {
    parent: PropTypes.instanceOf(ChainComponent),
  };

  static contextTypes = {
    parent: PropTypes.instanceOf(ChainComponent),
  };

  /**
   * get child context props
   * @returns {object} context property
   */
  getChildContext() {
    return {
      parent: this,
    };
  }

  /**
   * Handle Event, support view to handle page event
   * > Every view must override the method if need handle event
   * > the event can not be handle will throw to its parent component
   *
   * @param {string} eventType - event type
   * @param {object} params - event params
   */
  handleEvent(eventType, params) {
    this.parentHandleEvent(eventType, params);
  }

  /**
   * Parent Component to handle the event
   * @param {string} eventType - event type
   * @param {object} params - event params
   * @private
   */
  parentHandleEvent(eventType, params) {
    if (this.context && this.context.parent) {
      this.context.parent.handleEvent(eventType, params);
    }
  }

}

export default ChainComponent;
