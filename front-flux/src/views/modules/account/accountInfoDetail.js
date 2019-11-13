import React from 'react';
import BaseView from '../../baseView';
import EventType from '../../../common/eventType';
import style from './style/accountInfoDetail.scss';
import ModelFactory from '../../../model/modelFactory';
import ModelType from '../../../model/modelType';
import DataChangeType from '../../../model/dataChangeType';

import Loading from '../../common/router/components/loading';
import { Icon, Button, Row, Col } from 'antd';

/**
 * AccountInfoDetail
 */
class AccountInfoDetail extends BaseView {

  /**
   * AccountInfoDetail
   * @param {object} props - react props
   */
  constructor(props) {
    super(props);
    // create account model
    this.accountModel = ModelFactory.createModel(ModelType.ACCOUNT);

    this.state = {
      isLoading: true,
      data: {},
    };
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    this.accountModel.addDataChangeListener(
      DataChangeType.LOADED,
      this.handleDataLoaded
    );
    this.loadData();
  }

  /**
   * componentDidMount
   */
  componentWillUnmount() {
    this.accountModel.removeDataChangeListener(
      DataChangeType.LOADED,
      this.handleDataLoaded
    );
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
   * load data
   */
  loadData() {
    const data = this.accountModel.getAccount();
    console.log('loadData', data);

    if (data) {
      this.setState({
        data,
        isLoading: false,
      });
    }
  }

  /**
   * handle data loaded event
   * @param {object} data loaded result
   */
  handleDataLoaded = ({ isOK }) => {
    if (isOK) {
      this.loadData();
    } else {
      this.setState({ isLoading: false });
    }
  };

  /**
   * render
   * @returns {object} jsx
   */
  render() {
    const { userName, email, phone, country } = this.state.data;

    return (
      <Loading isLoading={this.state.isLoading}>
        <div className={style.account__detail}>
          <Button
            className={style.edit_button_a}
            onClick={e => this.handleEvent(EventType.ACCOUNT_EDIT_CLICK)}
          >
            <Icon type="tof-edit" className={style.edit_icon} />
            {this.t('btn.edit')}
          </Button>
          <Row className={style.detail_title}>
            {this.t('account:userContent.accountInfo')}
          </Row>
          <Row>
            <Col span={6} className={style.detail_key}>
              {this.t('account:userContent.userName')}
            </Col>
            <Col span={18} className={style.detail_value}>
              {userName}
            </Col>
          </Row>
          <Row>
            <Col span={6} className={style.detail_key}>
              {this.t('account:userContent.email')}
            </Col>
            <Col span={18} className={style.detail_value}>
              {email}
            </Col>
          </Row>
          <Row>
            <Col span={6} className={style.detail_key}>
              {this.t('account:userContent.phone')}
            </Col>
            <Col span={18} className={style.detail_value}>
              {phone}
            </Col>
          </Row>
          <Row>
            <Col span={6} className={style.detail_key}>
              {this.t('account:userContent.country')}
            </Col>
            <Col span={18} className={style.detail_value}>
              {country}
            </Col>
          </Row>
        </div>
      </Loading>
    );
  }

}

export default AccountInfoDetail;
