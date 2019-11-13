import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../baseView';
import EventType from '../../../common/eventType';
import ModelFactory from '../../../model/modelFactory';
import ModelType from '../../../model/modelType';
import Loading from '../../common/router/components/loading';
import { Form, Input, Button, Icon, Row, Col } from 'antd';
import style from './style/changePassword.scss';
import DataChangeType from '../../../model/dataChangeType';

const FormItem = Form.Item;

/**
 * Change Password Component
 */
class ChangePassword extends BaseView {

  /**
   * ChangePassword
   * @param {object} props - props
   */
  constructor(props) {
    super(props);
    this.accountModel = ModelFactory.createModel(ModelType.ACCOUNT);

    this.state = {
      isLoading: false,
    };
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    this.accountModel.addDataChangeListener(
      DataChangeType.PWD_UPDATED,
      this.handleUpdate
    );
  }

  /**
   * componentWillUnmount
   */
  componentWillUnmount() {
    this.accountModel.removeDataChangeListener(
      DataChangeType.PWD_UPDATED,
      this.handleUpdate
    );
  }

  /**
   * Event Handle
   * @param {string} eventType - event types
   * @param {object} params - event params
   */
  handleEvent(eventType, params) {
    switch (eventType) {
      case EventType.PASSWORD_SAVE_CLICK:
        this.handleSaveClick(params);
        break;
      default:
        super.handleEvent(eventType, params);
        break;
    }
  }

  /**
   * handle update event
   * @param {object} data - update status obj
   */
  handleUpdate = data => {
    this.setState({ isLoading: false });
    this.handleEvent(EventType.CHANGE_PSW_RESULT, data);
  };

  /**
   * handle submit event
   * @param {object} e - event object
   */
  handleSaveClick(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ isLoading: true });
        const params = {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        };

        super.handleEvent(EventType.PASSWORD_SAVE_CLICK, params);
      }
    });
  }

  /**
   * check pass
   * @param {object} rule - antd rule obj
   * @param {object} value - control value
   * @param {function} callback - antd callback
   */
  checkPass = (rule, value, callback) => {
    const { validateFields } = this.props.form;

    if (value) {
      validateFields([ 'confirmPassword' ]);

      if (value.length === 0) {
        callback(this.t('account:validate.passwordRequired'));
      }

      if (value.length < 6) {
        callback(this.t('account:validate.passwordLength'));
      }

      if (value.length > 24) {
        callback(this.t('account:validate.passwordLength'));
      }
    }

    callback();
  };

  /**
   * check pass match
   * @param {object} rule - antd rule obj
   * @param {object} value - control value
   * @param {function} callback - antd callback
   */
  checkPassMatch = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;

    if (value) {
      if (value.length === 0) {
        callback(this.t('account:validate.passwordRequired'));
      }

      if (value && value !== getFieldValue('newPassword')) {
        callback(`${this.t('account:validate.passwordNotMatch')}!`);
      }
    }

    callback();
  };

  /**
   * render
   * @returns {object} jsx
   */
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 5,
      },
      wrapperCol: { span: 13 },
    };

    return (
      <div>
        <Loading isLoading={this.state.isLoading}>
          <Form
            className={style.account__changepsw__form}
            onSubmit={e => this.handleEvent(EventType.PASSWORD_SAVE_CLICK, e)}
          >
            <FormItem
              className={style.account__changepsw__formitem}
              {...formItemLayout}
              label={this.t('account:passwordContent.currentPassword')}
            >
              {getFieldDecorator('oldPassword', {
                rules: [
                  {
                    required: true,
                    message: `${this.t('account:validate.passwordRequired')}`,
                  },
                ],
              })(
                <Input
                  className={`${style.account__changepsw__form__input} ${
                    style.account__changepsw__form__confirm
                  }`}
                  prefix={<Icon type="lock" />}
                  type="password"
                  placeholder={this.t('account:placeholder.password')}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={this.t('account:passwordContent.newPassword')}
            >
              {getFieldDecorator('newPassword', {
                rules: [{ validator: this.checkPass }],
              })(
                <Input
                  className={style.account__changepsw__form__input}
                  prefix={<Icon type="lock" />}
                  type="password"
                  placeholder={this.t('account:placeholder.password')}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={this.t('account:passwordContent.confirmPassword')}
            >
              {getFieldDecorator('confirmPassword', {
                rules: [{ validator: this.checkPassMatch }],
              })(
                <Input
                  className={style.account__changepsw__form__input}
                  prefix={<Icon type="lock" />}
                  type="password"
                  placeholder={this.t('account:placeholder.password')}
                />
              )}
            </FormItem>
            <Row>
              <Col span={13} className={style.account__changepsw__row}>
                <Button
                  htmlType="submit"
                  className={style.change_password_button}
                >
                  {this.t('account:btn.changePassword')}
                </Button>
              </Col>
            </Row>
          </Form>
        </Loading>
      </div>
    );
  }

}

ChangePassword.propTypes = {
  form: PropTypes.object,
};

export default Form.create()(ChangePassword);
