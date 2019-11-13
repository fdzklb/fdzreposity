import React from 'react';
import BaseView from '../../baseView';
import style from './index.scss';
import StatusCode from '../../../common/statusCode';

/**
 * Error Component
 */
class Error extends BaseView {

  /**
   * Error Component
   * @param {object} props react props
   */
  constructor(props) {
    super(props);

    this.errorMapping = {
      [StatusCode.NOT_FOUND]: 'Cannot find the page, please check.',
      [StatusCode.SERVER_ERROR]: 'Inner Server Error.',
      [StatusCode.UNAUTHORIZED]:
        'You have no permission to access, please check.',
    };
  }

  /**
   * render
   * @returns {object} jsx
   */
  render() {
    let code = this.props.code || '';

    return (
      <div className={style.page_container}>
        <div className={style.image_container}>
          <img
            src={require('../../../assets/images/error/404.png')}
            alt="404.png"
          />
          <img
            src={require('../../../assets/images/error/people.png')}
            style={{ position: 'absolute' }}
            alt="people.png"
          />
        </div>
        <div className={style.error}>{this.errorMapping[code.toString()]}</div>
      </div>
    );
  }

}

export default Error;
