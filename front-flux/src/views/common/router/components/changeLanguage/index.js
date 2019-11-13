import React from 'react';
import BaseView from '../../../../baseView';
import EventType from '../../../../../common/eventType';
import { LanguageCode } from '../../../../../common/constant';
import s from './index.scss';

/**
 * change language component
 */
class ChangeLanguage extends BaseView {

  /**
   * ChangeLanguage
   * @param {object} props react props
   */
  constructor(props) {
    super(props);

    this.state = {
      currentLng: this.i18n.getLanguage(),
    };
  }

  /**
   * componentWillReceiveProps
   */
  componentWillReceiveProps() {
    // update language
    let language = this.i18n.getLanguage();

    if (language !== this.state.currentLng) {
      this.setState({
        currentLng: language,
      });
    }
  }

  /**
   * render
   * @returns {object} jsx
   */
  render() {
    const { currentLng } = this.state;

    return (
      <span className={s.change_lng}>
        <button
          className={currentLng === LanguageCode.ZH ? s.lng_active : ''}
          onClick={() =>
            this.handleEvent(EventType.CHANGE_LANGUAGE, {
              lng: LanguageCode.ZH,
            })
          }
        >
          {this.t('lng.zh')}
        </button>
        <span>|</span>
        <button
          className={currentLng === LanguageCode.EN ? s.lng_active : ''}
          onClick={() =>
            this.handleEvent(EventType.CHANGE_LANGUAGE, {
              lng: LanguageCode.EN,
            })
          }
        >
          {this.t('lng.en')}
        </button>
      </span>
    );
  }

}

export default ChangeLanguage;
