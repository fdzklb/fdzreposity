import StateScene from './stateScene';
import StateFactory from './state/stateFactory';
import LocalStorage from '../dataUtil/localStorage';
import LocalStoreKey from '../common/localStoreKey';

/**
 * State Manager Class
 * @description build the state stack,
 * provider some method for managing the stack
 */
class StateManager {

  /**
   * State Manager
   * @param {object} context context instance
   * @param {object} state the init state
   */
  constructor(context, state) {
    // set context
    this.context = context;

    // build the state stack
    this.stateStack = [];

    // set init state
    this.initState = state;

    // get local storage instance
    this.localStorage = LocalStorage.getInstance();
  }

  /**
   * init
   * @public
   */
  start() {
    /*
     * 如果存在本地状态栈，先还原
     * 如不存在，将初始状态入栈
     */
    if (this.isExistedLocalStack()) {
      this.restoreLocalStack();
    } else {
      this.pushState(this.initState, {});
    }
  }

  /**
   * get current state
   * @public
   * @returns {object} state instance
   */
  getCurrentState() {
    const scene = this.getStackTop();

    if (scene) {
      return scene.state;
    }

    return null;
  }

  /**
   * get current state params
   * @public
   * @returns {string} state type
   */
  getCurrentStateType() {
    const scene = this.getStackTop();

    if (scene) {
      return this.convertToStateType(scene.state);
    }
  }

  /**
   * get current state params
   * @public
   * @returns {object} state params
   *  {path, params, topView}
   */
  getCurrentStateParams() {
    const scene = this.getStackTop();

    if (scene) {
      return scene.params;
    }

    return {};
  }

  /**
   * updateCurrentStateParams
   * @param {object} newParams newParams
   */
  updateCurrentStateParams(newParams) {
    if (this.stateStack.length > 0) {
      const currentScene = this.getStackTop();

      if (currentScene) {
        currentScene.updateParams(newParams);
      }
    }
  }

  /**
   * get state stack length
   * @returns {number} state length
   */
  count() {
    return this.stateStack.length;
  }

  /**
   * second view to switch state
   * @public
   * @param {object} state - state
   * @param {object} params - state params
   * @param {boolean} allowBack - allow back stack [default: true]
   * @param {boolean} matchParams match params
   */
  go(state, params = null, allowBack = true, matchParams = null) {
    if (this.contains(state) && allowBack) {
      this.back(state, params, matchParams);
    } else {
      this.pushState(state, params);
    }

    this.log('go');
  }

  /**
   * top view to switch state
   * will replace the top element of stack
   * @public
   * @param {object} state state
   * @param {object} params state params
   * @param {boolean} allowBack - allow back stack [default: true]
   * @param {array} matchParams match params
   */
  replace(state, params = null, allowBack = true, matchParams = null) {
    if (this.contains(state, params, matchParams)) {
      this.back(state, params, matchParams);
    } else {
      this.replaceState(state, params);
    }

    this.log('replace');
  }

  /**
   * Back to assigned state, allow to initState
   * no state to be assigned, back to last state
   * @public
   * @param {object} state state
   * @param {object} params state params
   * @param {array} matchParams match params
   */
  back(state, params = null, matchParams = null) {
    // 1) if has no target state, go back to last state
    if (!state && this.stateStack.length > 0) {
      this.popState();

      return;
    }

    // get current state scene
    const topScene = this.getStackTop();
    let topState = topScene.state;
    let topParams = topScene.params;

    // 2) if target state is current state, refresh current page.
    if (this.isSameState(state, topState, params, topParams, matchParams)) {
      if (!matchParams) {
        topScene.updateParams(params);
      }

      state.onBackEntered(this.context, params, null, null);

      // update local stack
      this.updateLocalStack();

      return;
    }

    // 3) if target state is in stack, pop state from stack
    //    until target state to be found.
    while (
      !this.isSameState(state, topState, params, topParams, matchParams)
      && this.stateStack.length > 1
    ) {
      this.popState(state, params, true);
      topState = this.getCurrentState();
      topParams = this.getCurrentStateParams();
    }

  }

  /**
   * judge is same state
   * @param {*} src source state
   * @param {*} target target state
   * @param {*} srcParams  source state
   * @param {*} targetParams target state
   * @param {*} matchParams if match params or not
   * @returns {boolean} is same or not
   */
  isSameState(src, target, srcParams, targetParams, matchParams) {
    let isSame = src === target;

    if (matchParams && matchParams.length > 0) {
      // 要匹配的参数已相等
      if (!srcParams && !targetParams) {
        isSame = isSame && true;
      } else if (srcParams && targetParams) {
        matchParams.forEach(key => {
          if (
            srcParams.params && targetParams.params &&
            srcParams.params[key] !== targetParams.params[key]
          ) {
            isSame = isSame && false;
          }
        });
      }
    } else {
      isSame = src === target;
    }

    return isSame;
  }

  /**
   * get the top element of the state stack
   * @private
   * @returns {object} state scene
   */
  getStackTop() {
    const stackLen = this.stateStack.length;

    if (stackLen > 0) {
      return this.stateStack[stackLen - 1];
    }

    return null;
  }

  /**
   * replace the top element of the stack
   * @private
   * @param {object} state - new state
   * @param {object} params - new state params
   */
  replaceState(state, params = null) {
    if (!state) {
      return;
    }

    if (this.stateStack.length > 1) {
      this.popState(undefined, undefined, true);
      this.pushState(state, params);
    } else {
      this.pushState(state, params);
    }
  }

  /**
   * push state to the stack
   * @private
   * @param {object} state - state to push
   * @param {object} params - state params
   */
  pushState(state, params = null) {
    if (!state) {
      return;
    }

    let lastState, lastParams;

    if (this.stateStack.length > 0) {
      const scene = this.getStackTop();
      lastState = scene.state;
      lastParams = scene.params;
      lastState.onForwardExited(this.context, lastParams, state, params);
    }

    const stateScene = new StateScene(state, params);
    this.stateStack.push(stateScene);
    state.onForwardEntered(this.context, params, lastState, lastParams);

    // update local stack
    this.updateLocalStack();
  }

  /**
   * pop the state
   * @private
   * @param {object} state - target state
   * @param {object} params - reset the params
   * @param {boolean} isContinue - is continue
   */
  popState(state, params = null, isContinue = false) {
    const popScene = this.stateStack.pop();

    if (popScene) {
      let nextState, nextParams;
      const popState = popScene.state;
      const popParams = popScene.params;

      if (this.stateStack.length > 0) {
        const currentScene = this.getStackTop();
        nextState = currentScene.state;

        // next state equal target state, update params
        if (params && nextState === state) {
          currentScene.updateParams(params);
        }

        nextParams = currentScene.params;
        nextState.onBackEntered(
          this.context, nextParams, popState, popParams, isContinue
        );
      }

      popState.onBackExited(this.context, popParams, nextState, nextParams);
    }

    // update local stack
    this.updateLocalStack(this.stateStack);
  }

  /**
   * removeState
   * @param {object} stateTypes stateType
   */
  removeState(stateTypes) {
    if (typeof stateTypes === 'string') {
      stateTypes = [ stateTypes ];
    }

    this.stateStack = this.stateStack
      .filter(stateScene => {
        const stateMatch = this.convertToStateType(stateScene.state)

        return stateTypes.indexOf(stateMatch) === -1;
      });

    this.updateLocalStack();
  }

  /**
  * keep the states but remove other
  * @param {object} stateTypes stateType
  */
  keepState(stateTypes) {
    if (typeof stateTypes === 'string') {
      stateTypes = [ stateTypes ];
    }

    this.stateStack = this.stateStack
      .filter(stateScene => {
        const stateMatch = this.convertToStateType(stateScene.state);

        return stateTypes.indexOf(stateMatch) > -1;
      });

    this.updateLocalStack();
  }

  /**
   * the stack contains the state or not
   * @private
   * @param {object} state - the state
   * @param {object} stateParams params
   * @param {*} matchParams matchParams
   * @returns {boolean} contains or not
   */
  contains(state, stateParams, matchParams) {
    let isContains = false;
    this.stateStack.forEach(scene => {
      if (scene.state === state) {
        isContains = true;

        // if has matchParams, every params must equal
        if (matchParams && matchParams.length > 0) {
          matchParams.forEach(key => {
            if (
              stateParams.params &&
              scene.getParams() &&
              scene.getParams().params &&
              stateParams.params[key] !== scene.getParams().params[key]
            ) {
              isContains = false;
            }
          });
        }
      }
    });

    return isContains;
  }

  /**
   * the state stack is saved in local storage or not
   * @private
   * @returns {boolean} existed or not
   */
  isExistedLocalStack() {
    const localStack = this.localStorage.getItem(LocalStoreKey.STATE_STACK);

    if (
      !localStack ||
      localStack === 'null' ||
      Object.keys(JSON.parse(localStack)).length === 0
    ) {
      return false;
    }

    return true;
  }

  /**
   * update the stack in localStorage
   */
  updateLocalStack() {
    if (this.stateStack) {
      const localStack = this.stateStack
        .map(stack => ({
          stateType: this.convertToStateType(stack.state),
          params: stack.params,
        }));

      this.localStorage.setItem(
        LocalStoreKey.STATE_STACK,
        JSON.stringify(localStack)
      );
    }
  }

  /**
   * restore the stack from localStorage
   * @private
   */
  restoreLocalStack() {
    const localStack = this.localStorage.getItem(LocalStoreKey.STATE_STACK);

    if (localStack) {
      const stack = JSON.parse(localStack);
      // 转化为State实例类型
      this.stateStack = stack
        .map(stack => {
          const state = StateFactory.getState(stack.stateType);

          if (state) {
            return new StateScene(state, stack.params);
          }

          return null;
        })
        .filter(item => item !== null);
    }
  }

  /**
   * get state class name, support IE
   * @param {object} state state object
   * @returns {string} state class name
   */
  getClassName(state) {
    if (state.constructor.name) {
      return state.constructor.name;
    }

    return state.constructor.toString().match(/^\s*function\s*(\S*)\s*\(/)[1];
  }

  /**
   * convertToStateType
   * @param {object} state state object
   * @returns {string} state type
   */
  convertToStateType(state) {
    let stateType = this.getClassName(state);

    // 转化为状态类型值
    stateType = stateType
      .replace(/^[A-Z]/, char => char.toLowerCase())
      .replace(
        /^([a-z])([A-Z]*)(?=[A-Z][a-z]+)/,
        (str, $1, $2) => $1 + $2.toLowerCase()
      );

    return stateType;
  }

  /**
   * log the state stack
   * @private
   * @param {string} text - text to log
   */
  log(text) {
    const stack = this.stateStack.map(item => ({
      state: this.getClassName(item.state),
      params: item.params,
    }));

    console.log(`[${text}] [Stack] ${JSON.stringify(stack)}`);
  }

}

export default StateManager;
