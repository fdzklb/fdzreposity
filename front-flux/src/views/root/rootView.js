import React from 'react';
import BaseView from '../baseView';
import ViewFactory from '../viewFactory';
import CommandType from '../../common/commandType';
import TopViewType from '../../common/topViewType';
import TopViewConfig, { ViewTemplate } from '../common/topViewConfig';
import HomeTemplate from './homeTemplate';
import { notification } from 'antd';

import style from './rootView.scss';

/**
 * View Manager
 */
class RootView extends BaseView {

  /**
   * RootView
   * @constructor
   * @param {object} props - react props
   */
  constructor(props) {
    super(props);

    this.state = {
      view: null,
      viewType: null,
      viewParams: {},
      i18nLoadedAt: null,
    };
  }

  /**
   * Event Handle
   * @param {string} eventType - event types
   * @param {object} params - event params
   */
  handleEvent(eventType, params) {
    switch (eventType) {
      default:
        super.handleEvent(eventType, params);
        break;
    }
  }

  /**
   * process command
   * @param {string} commandType - command type
   * @param {object} params - command params
   */
  processCommand(commandType, params) {
    switch (commandType) {
      case CommandType.TRANSFER_VIEW:
        this.transferView(params.topView, params.params);
        break;
      case CommandType.UPDATE_VIEW_PARAMS:
        this.updateHomeTmplViewParams(params);
        break;
      case CommandType.COPY_SUCCESS:
        this.toast({
          text: this.t('copy.success'),
        });
        break;
      case CommandType.COPY_FAIL:
        this.toast({
          text: this.t('copy.fail'),
        });
        break;
      case CommandType.RELOAD_I18N:
        this.setState({
          i18nLoadedAt: params.i18nLoadedAt,
        });
        break;
      case CommandType.TOAST:
        this.toast({
          text: params,
        });
        break;
      default:
        break;
    }
  }

  /**
   * transfer top view
   * @param {string} type - topview type
   * @param {object} params - params
   */
  transferView(type, params) {
    const TopView = ViewFactory.create(type);

    if (TopView) {
      let view = null;
      const viewConfig = TopViewConfig[type];

      // clear all views when logout
      if (type === TopViewType.LOGIN) {
        ViewFactory.clearAllViews();
      }

      switch (viewConfig.template) {
        // No template
        case ViewTemplate.NONE:
          view = <TopView {...params} />;
          break;
        // Home Template
        case ViewTemplate.HOME:
          view = <HomeTemplate type={type} params={params} />;
          break;
        default:
          break;
      }

      // set the TopView
      this.setState({
        view: view,
        viewType: type,
        viewParams: params,
      });
    }
  }

  /**
   * Update topView params with home template
   * @param {object} params - view params
   */
  updateHomeTmplViewParams(params) {
    const type = this.state.viewType;
    // merge params
    const viewParams = {
      ...this.state.viewParams,
      ...params,
    };

    const view = <HomeTemplate type={type} params={viewParams} />;

    this.setState({
      view: view,
      params: viewParams,
    });
  }

  /* ------------- View Module---------- */
  /**
   * notification toast
   * @param {string} text - content
   */
  toast({ text }) {
    const self = this;
    notification.open({
      message: self.t('toast.defaultTitle'),
      description: text,
      style: {
        zIndex: 20000,
      },
    });
  }

  /**
   * render
   * @returns {object} view
   */
  render() {
    const { view } = this.state;

    return <div className={style.top_body}>{view}</div>;
  }

}

export default RootView;
