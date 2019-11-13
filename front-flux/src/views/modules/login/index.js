import React from 'react';
import BaseView from '../../baseView';
import { Button } from 'antd';
import EventType from '../../../common/eventType';
import ModelFactory from '../../../model/modelFactory';
import ModelType from '../../../model/modelType';
import DataChangeType from '../../../model/dataChangeType';
import s from './index.scss';

/**
 * Login
 */
class Login extends BaseView {

  /**
   * Login
   * @param {object} props react props
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      errorMsg: '',
      isLoading: false,
    };

    this.accountModel = ModelFactory.createModel(ModelType.ACCOUNT);
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    this.accountModel.addDataChangeListener(
      DataChangeType.VERIFIED,
      this.handleLoginResult
    );
  }

  /**
   * componentWillUnmount
   */
  componentWillUnmount() {
    this.accountModel.removeDataChangeListener(
      DataChangeType.VERIFIED,
      this.handleLoginResult
    );
  }

  /**
   * Event Handle
   * @param {string} eventType - event types
   * @param {object} params - event params
   */
  handleEvent(eventType, params) {
    switch (eventType) {
      case EventType.LOGIN_INPUT_ACCOUNT_CHANGE:
        this.setState({
          name: params.target.value.trim(),
        })
        break;
      case EventType.LOGIN_INPUT_PASSWORD_CHNAGE:
        this.setState({
          password: params.target.value.trim(),
        });
        break;
      case EventType.LOGIN_CLICK:
        this.handleLoginClick(params);
        break;
      default:
        super.handleEvent(eventType, params);
        break;
    }
  }

  /**
   * handle login click
   * @param {object} e - event obj
   */
  handleLoginClick = e => {
    e.preventDefault();

    // submit loading
    this.setState({
      isLoading: true,
    });

    if (!this.state.name) {
      this.setErrorMsg('Please enter your user name.');

      return;
    }

    if (!this.state.password) {
      this.setErrorMsg('Please enter your password.');

      return;
    }

    super.handleEvent(EventType.LOGIN_CLICK, {
      name: this.state.name,
      password: this.state.password,
    });
  };

  /**
   * handle login change
   * @param {object} params {token, code}
   */
  handleLoginResult = ({ isOK, code }) => {
    this.setState({
      isLoading: false,
    });

    if (isOK) {
      this.handleEvent(EventType.LOGIN_SUCCESS);
    } else {
      this.setErrorMsg('login failed.');
    }
  };

  /**
   * set the error msg
   * @param {string} msg error msg
   */
  setErrorMsg(msg) {
    this.setState({
      errorMsg: msg,
      isLoading: false,
    });
  }

  /**
   * render
   * @returns {object} jsx
   */
  render() {
    let { isLoading, errorMsg } = this.state;

    return (
      <section className={s.background_wrapper}>
        <div className={s.mark_box}>
          <div className={s.login}>
            <h1>
              Make <i>Money</i> <br />
              with Mobisummer
            </h1>
            <form
              autoComplete="on"
              className={s.loginForm}
              onSubmit={e => this.handleEvent(EventType.LOGIN_CLICK, e)}
            >
              <div className={s.logo} />
              <input
                placeholder="User Name"
                autoFocus
                onChange={e =>
                  this.handleEvent(EventType.LOGIN_INPUT_ACCOUNT_CHANGE, e)
                }
              />
              <input
                placeholder="Password"
                type="password"
                onChange={e =>
                  this.handleEvent(EventType.LOGIN_INPUT_PASSWORD_CHNAGE, e)
                }
              />
              <div className={s.errInfo}>
                <p>{errorMsg}</p>
              </div>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Log In
              </Button>
            </form>
          </div>
        </div>
      </section>
    );
  }

}

export default Login;
