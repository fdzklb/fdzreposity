import React from 'react';
import PropTypes from 'prop-types';
import { Select, Button, Icon } from 'antd';

import EventType from '../../../../../common/eventType.js';
import BaseView from '../../../../baseView';
import s from './paginator.scss';

const Option = Select.Option;
const ButtonGroup = Button.Group;

const PAGE_PREV = 'PAGE_PREV';
const PAGE_NEXT = 'PAGE_NEXT';
const TEXT = 'Rows per page';

/**
 * Paginator Component
 */
class Paginator extends BaseView {

  /**
   * Paginator
   * @param {object} props - react props
   */
  constructor(props) {
    super(props);

    const size =
      this.props.pageSizeList.indexOf(this.props.defaultPageSize) !== -1
        ? this.props.defaultPageSize
        : this.props.pageSizeList[0];
    const total = this.props.size;
    const index = this.props.index || 0;
    const count = Math.ceil(total / size);

    this.state = {
      total,
      size,
      index,
      count,
    };
  }

  /**
   * component will receive props
   * @param {object} nextProps next props
   */
  componentWillReceiveProps(nextProps) {
    const { index, size } = nextProps;
    this.setState(prevState => ({
      index,
      total: size,
      count: Math.ceil(size / prevState.size),
    }));
  }

  /**
   * handerChangePageSize
   * @param {string} value - pagesize
   */
  handleChangePageSize = value => {
    const size = Number(value);
    const index = 0;
    const count = Math.ceil(this.state.total / size);
    this.setState({ size, index, count });
    this.handleEvent(EventType.PAGINATOR_PAGE_CHANGE, {
      index,
      size,
    });
  };

  /**
   * handleChangePageIndex
   * @param {string} str - page index
   */
  handleChangePageIndex = (str) => {
    let index;

    switch (str) {
      case PAGE_PREV:
        index = this.state.index - 1;
        break;
      case PAGE_NEXT:
        index = this.state.index + 1;
        break;
      default:
        break;
    }

    this.setState({ index });
    this.handleEvent(EventType.PAGINATOR_PAGE_CHANGE, {
      index,
      size: this.state.size,
    });
  };

  /**
   * render
   * @returns {object} jsx
   */
  render() {
    return (
      <div className={s.paginator}>
        <Select
          size="small"
          onChange={this.handleChangePageSize}
          value={this.state.size}
        >
          {this.props.pageSizeList.map(item => (
            <Option key={item} value={item}>
              {item}
            </Option>
          )) }
        </Select>
        <span className={s.text_style}>{TEXT}</span>
        <ButtonGroup>
          <Button
            ghost
            disabled={this.state.index <= 0}
            onClick={e => this.handleChangePageIndex(PAGE_PREV, e)}
            style={{
              borderRight: 0,
            }}
            className={s.paginator__left}
            size="small"
          >
            <Icon
              style={{
                fontSize: '12px',
              }}
              size="small"
              type="left"
            />
          </Button>
          <Button
            ghost
            disabled={this.state.index + 1 >= this.state.count}
            onClick={e => this.handleChangePageIndex(PAGE_NEXT, e)}
            style={{
              borderLeft: 0,
            }}
            className={s.paginator__right}
            size="small"
          >
            <Icon
              style={{
                fontSize: '12px',
              }}
              size="small"
              type="right"
            />
          </Button>
        </ButtonGroup>
        <span className={s.text_style}>
          {`${this.state.index + 1} / ${this.state.count}`}
        </span>
      </div>
    );
  }

}

Paginator.propTypes = {
  size: PropTypes.number,
  index: PropTypes.number,
  pageSizeList: PropTypes.arrayOf(PropTypes.number),
  onChangeCallback: PropTypes.func,
  defaultPageSize: PropTypes.number,
};

Paginator.defaultProps = {
  size: 101,
  index: 0,
  pageSizeList: [
    10, 20, 50, 100,
  ],
  onChangeCallback: () => {},
};

export default Paginator;
