import BaseView from '../../baseView';

/**
 * Home Module with hide and show
 */
class HomeModule extends BaseView {

  /**
   * shouldComponentUpdate
   * @param {object} nextProps - next props
   * @returns {boolean} - is render or not
   */
  shouldComponentUpdate(nextProps) {
    if (nextProps.hide) {
      return false;
    }

    return true;
  }

  /**
   * render
   * @returns {object} jsx
   */
  render() {
    return this.props.children;
  }

}

export default HomeModule;
