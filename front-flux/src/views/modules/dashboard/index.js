import React from 'react';
import BaseView from '../../baseView';
import EventType from '../../../common/eventType';

/**
 * Dashboard Module
 */
class Dashboard extends BaseView {

  /**
   * render
   * @returns {object} jsx
   */
  render() {
    return (
      <div>
        {this.t('dashboard')}
        <button onClick={e => this.handleEvent(EventType.SECOND_CLICK)}>
          {this.t('btn.secondView')}
        </button>
        <button
          onClick={e =>
            this.handleEvent(EventType.COPY_CLICK, {
              text: 'i am copy.',
            })
          }
        >
          {this.t('btn.copy')}
        </button>
      </div>
    );
  }

}

export default Dashboard;
