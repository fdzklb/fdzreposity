/**
 * State Scene, the element of the stack
 */
class StateScene {

  /**
   * State Scene
   * @param {object} state state
   * @param {object} params params
   */
  constructor(state, params) {
    /**
     * the state to push
     */
    this.state = state;
    /**
     * the state params to push
     */
    this.params = params;
  }

  /**
   * update the stack params
   * @param {object} params stack params
   */
  updateParams(params) {
    if (params) {
      this.params = params;
    }
  }

  /**
   * clear the stack
   */
  recycle() {
    if (this.params) {
      this.params = null;
    }
  }

}

export default StateScene;
