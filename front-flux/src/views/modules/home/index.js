import React from 'react';
import BaseView from '../../baseView';
import ModelType from '../../../model/modelType';
import ModelFactory from '../../../model/modelFactory';
import EventType from '../../../common/eventType';
import RouterLink from '../../common/router/routerLink';
import { Icon, Layout } from 'antd';
import s from './index.scss';
import ChangeLanguage from '../../common/router/components/changeLanguage';
import HomeMenu from './menu';

const { Sider, Content, Header } = Layout;

/**
 * Home Template
 */
class Home extends BaseView {

  /**
   * Home
   * @param {object} props react props
   */
  constructor(props) {
    super(props);

    this.accountModel = ModelFactory.createModel(ModelType.ACCOUNT);

    this.state = {
      collapsed: false,
      username: this.accountModel.getUserName(),
    };
  }

  /**
   * componentWillReceiveProps
   */
  componentWillReceiveProps() {
    // update user name
    let username = this.accountModel.getUserName();

    if (username !== this.state.username) {
      this.setState({
        username: username,
      });
    }
  }

  /**
   * Event Handle
   * @param {string} eventType - event types
   * @param {object} params - event params
   */
  handleEvent(eventType, params) {
    switch (eventType) {
      case EventType.MENU_SIDEBAR_CLICK:
        this.onCollapse(params);
        break;
      default:
        super.handleEvent(eventType, params);
        break;
    }
  }

  /**
   * collapse or uncollapse MenuSideBar
   * @param {object} e - event obj
   */
  onCollapse = e => {
    e.preventDefault();
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  /**
   * render
   * @returns {object} jsx
   */
  render() {
    const { username } = this.state;
    const viewName = this.t(this.props.viewName);

    return (
      <Layout className={s.home_container}>
        <Sider
          width={240}
          collapsed={this.state.collapsed}
          className={s.home_slider}
        >
          <div className={s.brand_logo}>
            <RouterLink eventType={EventType.MENU_DASHBOARD_CLICK}>
              <Icon type="tof-logo" />
              {this.state.collapsed ? '' : <h1> </h1>}
            </RouterLink>
          </div>
          <HomeMenu />
          <div
            className={s.collapse_btn}
            style={{ width: this.state.collapsed ? 80 : 240 }}
            onClick={e => {
              this.handleEvent(EventType.MENU_SIDEBAR_CLICK, e);
            }}
          >
            {this.state.collapsed ? (
              <Icon type="right" />
            ) : (
              <Icon type="left" />
            )}
          </div>
        </Sider>
        <Layout
          style={
            this.state.collapsed
              ? { marginLeft: '80px', overflowX: 'inherit' }
              : { marginLeft: '240px', overflowX: 'inherit' }
          }
        >
          <Header
            style={this.state.collapsed ? { left: '80px' } : { left: '240px' }}
            className={s.header_wrapper}
          >
            <div className={s.header}>
              <h2 span={16} className={s.header_bread}>
                {viewName}
              </h2>
              <div className={s.action_bar}>
                <ChangeLanguage />
                <p className={s.user_name} title={username ? username : ''}>
                  <RouterLink eventType={EventType.MENU_ACCOUNT_CLICK}>
                    <Icon type="tof-icon" />
                    <span>{username ? username : ''}</span>
                  </RouterLink>
                </p>
                <span
                  className={s.sign_out}
                  onClick={e => this.handleEvent(EventType.MENU_LOGOUT_CLICK)}
                >
                  {this.t('signOut')}
                </span>
              </div>
            </div>
          </Header>
          <Content>{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }

}

export default Home;
