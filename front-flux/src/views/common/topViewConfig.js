import TopViewType from '../../common/topViewType';

/**
 * View Template
 */
export const ViewTemplate = {
  NONE: 'none',
  HOME: 'home',
};

/**
 * TopView Config
 */
export default {
  [TopViewType.COMMENT]: {
    viewName: 'menu.comment',
    template: ViewTemplate.HOME,
    path: '/comment',
  },
  [TopViewType.COMMENTLIST]: {
    viewName: 'menu.commentList',
    template: ViewTemplate.NONE,
    path: '/comment/commentList',
  },

  [TopViewType.LOGIN]: {
    viewName: 'menu.login',
    template: ViewTemplate.NONE,
    path: '/login',
  },
  [TopViewType.ERROR]: {
    viewName: 'menu.error',
    template: ViewTemplate.NONE,
    path: '/error',
  },
  [TopViewType.DASHBOARD]: {
    viewName: 'menu.dashboard',
    template: ViewTemplate.HOME,
    path: '/dashboard',
  },
  [TopViewType.ACCOUNT]: {
    viewName: 'menu.account',
    template: ViewTemplate.HOME,
    path: '/account',
  },
  [TopViewType.REPORT]: {
    viewName: 'menu.report',
    template: ViewTemplate.HOME,
    path: '/report',
  },
  [TopViewType.SECOND]: {
    viewName: 'menu.second',
    template: ViewTemplate.HOME,
    path: '/dashboard/second',
  },
};
