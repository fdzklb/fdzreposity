import React from 'react';
import BaseView from '../../baseView';
import ModelType from '../../../model/modelType';
import ModelFactory from '../../../model/modelFactory';
import DataChangeType from '../../../model/dataChangeType';
import RouterLink from '../../common/router/routerLink';
import { parseMenuKey, MenuList } from '../../common/matcher/menuUrlMatcher';
import { Icon, Menu } from 'antd';
import s from './index.scss';

/**
 * home menu
 */
class HomeMenu extends BaseView {

  /**
   * Home
   * @param {object} props react props
   */
  constructor(props) {
    super(props);

    this.locationModel = ModelFactory.createModel(ModelType.LOCATION);

    const location = this.locationModel.getCurrentLocation();
    const menuKey = parseMenuKey(location.path);

    this.state = {
      actionPage: menuKey ? [ menuKey ] : [],
    };
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    this.locationModel.addDataChangeListener(this.locationChange);
    this.locationModel.addDataChangeListener(
      DataChangeType.UPDATED,
      this.locationChange
    );
  }

  /**
   * componentWillUnmount
   */
  componentWillUnmount() {
    this.locationModel.removeDataChangeListener(this.locationChange);
    this.locationModel.removeDataChangeListener(
      DataChangeType.UPDATED,
      this.locationChange
    );
  }

  /**
   * handle location change, reset menu active item
   * @param {object} data location data
   */
  locationChange = data => {
    this.setState(preState => {
      const newState = Object.assign({}, preState);
      const menuKey = parseMenuKey(data.path);

      if (menuKey !== null) {
        newState.actionPage = [ menuKey ];
      } else {
        newState.actionPage = [];
      }

      return newState;
    });
  };

  /**
   * render
   * @returns {object} -jsx
   */
  render() {
    return (
      <Menu
        mode="inline"
        defaultSelectedKeys={this.state.actionPage}
        className={s.menu}
        key={`${this.state.actionPage}_menu`}
      >
        {MenuList.map((menu, index) => (
          <Menu.Item key={menu.menuKey} className={s.menu_item}>
            <RouterLink eventType={menu.eventType}>
              <Icon
                className={s.menu_item_icon}
                type={menu.icon ? menu.icon : 'tof-dashboard'}
              />
              <span className={s.menu_item_word}>
                {this.t(menu.displayName)}
              </span>
            </RouterLink>
          </Menu.Item>
        ))}
      </Menu>
    );
  }

}

export default HomeMenu;
