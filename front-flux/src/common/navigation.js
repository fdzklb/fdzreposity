/**
 * define NavigationPath
 */
export const NavigationPath = {
  INDEX: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  ERROR: '/error',
  ACCOUNT: '/account',
  REPORT: '/report',
  SECOND: '/dashboard/second',
  COMMENT: '/comment',
  COMMENTLIST: '/comment/commentList',
};

/**
 * Navigation Class
 * @description provider navigation match method
 */
class Navigation {

  // private property
  static _instance = null;

  /**
   * single instance
   * @returns {object} Navigation
   */
  static getInstance() {
    if (this._instance == null) {
      this._instance = new Navigation();
    }

    return this._instance;
  }

  /**
   * to parse the path to get the navigationId and params
   * @param {string} path location path
   * @returns {object} {path: string, params : object}
   */
  parsePath(path) {
    let navigationIdVal = null;
    let paramsVal = {};
    const keys = Object.keys(NavigationPath);

    for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
      const index = keys[keyIndex];
      const navigationItem = NavigationPath[index];

      if (navigationItem === path) {
        navigationIdVal = navigationItem;
        break;
      }

      const matchResult = this.matchPathList(navigationItem, path);

      if (matchResult.match) {
        navigationIdVal = navigationItem;
        paramsVal = matchResult.params;
        break;
      }
    }

    return {
      path: navigationIdVal,
      params: paramsVal,
    };
  }

  /**
   * to match origin path to dist path
   * e.g:
   * origin: /demo/:offerId, dist: /demo/3
   * will match and return param: {offerId: 3}
   * @private
   * @param {string} originPath - defined path
   * @param {string} distPath - real path
   * @returns {object} {match:'', params:{}}
   */
  matchPathList(originPath, distPath) {
    const originPathSplit = originPath.split('/');
    const distPathSplit = distPath.split('/');

    if (originPathSplit.length !== distPathSplit.length) {
      return {
        match: false,
        param: {},
      };
    }

    if (originPathSplit.length === 1) {
      return {
        match: true,
        param: {},
      };
    }

    let matchVal = true;
    const paramsVal = {};

    for (
      let originIndex = 1;
      originIndex < originPathSplit.length;
      originIndex++
    ) {
      const originItem = originPathSplit[originIndex];
      const distItem = distPathSplit[originIndex];

      if (originItem.indexOf(':') === 0) {
        const paramsKey = originItem.substr(1);
        paramsVal[paramsKey] = distItem;
      } else if (distItem === originItem) {
      } else {
        matchVal = false;
        break;
      }
    }

    return {
      match: matchVal,
      params: paramsVal,
    };
  }

}

export default Navigation;
