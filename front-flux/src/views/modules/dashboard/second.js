import React from 'react';
import BaseView from '../../baseView';
import EventType from '../../../common/eventType';

/**
 * Second View
 */
class SecondView extends BaseView {

  /**
   * render
   * @returns {object} jsx
   */
  render() {
    return (
      <div>
        {this.t('secondView')}
        <button onClick={e => this.handleEvent(EventType.SECOND_BACK_CLICK)}>
          {this.t('btn.back')}
        </button>
      </div>
    );
  }

}

export default SecondView;
