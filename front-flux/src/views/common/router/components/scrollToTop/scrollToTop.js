import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../../../baseView';
import ModelFactory from '../../../../../model/modelFactory';
import ModelType from '../../../../../model/modelType';
import DataChangeType from '../../../../../model/dataChangeType';

/**
 * ScrollToTop Component
 */
class ScrollToTop extends BaseView {

  /**
   * ScrollToTop
   * @param {object} props - react props
   */
  constructor(props) {
    super(props);
    this.locationModel = ModelFactory.createModel(ModelType.LOCATION);
  }

  /**
   * component did mount
   */
  componentDidMount() {
    this.locationModel.addDataChangeListener(
      DataChangeType.UPDATED,
      this.handleLocationChange
    );
  }

  /**
   * component will unmount
   */
  componentWillUnmount() {
    this.locationModel.removeDataChangeListener(
      DataChangeType.UPDATED,
      this.handleLocationChange
    );
  }

  /**
   * when location change, scroll will to top
   * @param {object} data - data to change
   */
  handleLocationChange = data => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  /**
   * render
   * @returns {object} jsx
   */
  render() {
    return <div style={{ height: '100%' }}>{this.props.children}</div>;
  }

}

ScrollToTop.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
    PropTypes.object,
  ]),
};

export default ScrollToTop;
