import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../baseView';
import ScrollToTop from '../../common/router/components/scrollToTop';
import Home from '../../modules/home';
import HomeModule from '../homeModule';
import TopViewConfig from '../../common/topViewConfig';
import ViewFactory from '../../viewFactory';

/**
 * Build view with Home Template
 */
class HomeTemplate extends BaseView {

  /**
   * render
   * @returns {object} - jsx
   */
  render() {
    const { type, params } = this.props;

    /**
     * render all home template views
     * if current view, set style display:block
     * else set style display:none
     */
    const allViews = ViewFactory.getAllViews();
    const viewConfig = TopViewConfig[type];

    return (
      <ScrollToTop>
        <Home viewName={viewConfig.viewName}>
          {Object.keys(allViews).map(key => {
            const View = allViews[key];

            // hide view if needn't be displayed
            const hide = key !== type;

            return (
              <div key={key} style={{ display: hide ? 'none' : 'block' }}>
                <HomeModule hide={hide}>
                  <View {...params} />
                </HomeModule>
              </div>
            );
          })}
        </Home>
      </ScrollToTop>
    );
  }

}

HomeTemplate.propTypes = {
  type: PropTypes.string,
  params: PropTypes.object,
};

HomeTemplate.defaultProps = {
  params: {},
};

export default HomeTemplate;
