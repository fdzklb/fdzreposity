import React from 'react';
import BaseView from '../../../../baseView';

/**
 * import component with async method
 * @param {function} importComponent - load component
 * @returns {object} component instance
 */
export default function asyncComponent(importComponent) {
  /**
   * AsyncCompnent
   */
  class AsyncComponent extends BaseView {

    /**
     * Async Compnent
     * @param {object} props - react props
     */
    constructor(props) {
      super(props);

      this.state = {
        component: null,
      };
    }

    /**
     * wait component loaded
     */
    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component,
      });
    }

    /**
     * render
     * @returns {object} jsx
     */
    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  
  }

  return AsyncComponent;
}
