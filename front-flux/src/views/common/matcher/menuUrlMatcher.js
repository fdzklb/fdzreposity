import EventType from '../../../common/eventType';
import MatchItem from './matchItem';
import TopViewType from '../../../common/topViewType';
import { NavigationPath } from '../../../common/navigation';

/**
 * Match url and menu
 * if you add the menu, please add the matching regular here
 */
export const MenuList = [
  {
    menuKey: TopViewType.DASHBOARD,
    displayName: 'menu.dashboard',
    eventType: EventType.MENU_DASHBOARD_CLICK,
    icon: 'tof-dashboard',
    matchRules: [
      new MatchItem(MatchItem.MatchTypeFull, '', TopViewType.DASHBOARD),
      new MatchItem(
        MatchItem.MatchTypeFull,
        NavigationPath.INDEX,
        TopViewType.DASHBOARD
      ),
      new MatchItem(
        MatchItem.MatchTypeRegular,
        NavigationPath.DASHBOARD,
        TopViewType.DASHBOARD
      ),
    ],
  },
  {
    menuKey: TopViewType.REPORT,
    displayName: 'menu.report',
    eventType: EventType.MENU_REPORT_CLICK,
    icon: 'tof-report',
    matchRules: [
      new MatchItem(
        MatchItem.MatchTypeRegular,
        NavigationPath.REPORT,
        TopViewType.REPORT
      ),
    ],
  },
  {
    menuKey: TopViewType.COMMENT,
    displayName: 'menu.comment',
    eventType: EventType.MENU_COMMENT_CLICK,
    icon: 'tof-comment',
    matchRules: [
      new MatchItem(MatchItem.MatchTypeFull, '', TopViewType.COMMENT),
      new MatchItem(
        MatchItem.MatchTypeFull,
        NavigationPath.INDEX,
        TopViewType.COMMENT
      ),
      new MatchItem(
        MatchItem.MatchTypeRegular,
        NavigationPath.COMMENT,
        TopViewType.COMMENT
      ),
    ],
  },
];

export const parseMenuKey = url => {
  for (let i = 0; i < MenuList.length; i++) {
    for (let j = 0; j < MenuList[i].matchRules.length; j++) {
      const item = MenuList[i].matchRules[j];

      if (item.isMatch(url)) {
        return item.menuKey;
      }
    }
  }

  return null;
};
