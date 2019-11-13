// TODO:无用的代码删掉  ##

import React from 'react';
import BaseView from '../../baseView';
import ModelType from '../../../model/modelType';
import ModelFactory from '../../../model/modelFactory';
import EventType from '../../../common/eventType';
import DataChangeType from '../../../model/dataChangeType';
import './fdz.css';

/**
 * Comment Module
 */
class Comment extends BaseView {

  /**
   * @param {object} props react props
   */
  constructor(props) {
    super(props);

    this.commentModel = ModelFactory.createModel(ModelType.COMMENT);

    this.state = {
      userId: '',
      userName: '',
      comment: '',
    };
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    // TODO: 在组件渲染后，应初始化个人详情（直接跟model拿数据）getComment,有id或者username去查，没有则不查
    // TODO: 并监听获取comment handleLoadedComment
    this.commentModel.addDataChangeListener(
      DataChangeType.ADD_COMMENT,
      this.handleUpdate
    );
    this.commentModel.addDataChangeListener(
      DataChangeType.GET_COMMENTLIST,
      this.handleLoaded
    );
    this.commentModel.addDataChangeListener(
      DataChangeType.UPDATED_COMMENT,
      this.handleUpdate
    );

  }

  /**
   * TODO: componentWillReceiveProps 当传入的id发生变化，应重新去getComment
   * 当从commentList切换到本页时，根据接收到的参数查询comment信息，加载到本页
   * @param {object} nextProps nextProps
   */
  componentWillReceiveProps(nextProps) { // 接收的是userId吗？？
    if(nextProps) {
      this.loadComment(nextProps)
    }
  }

  loadComment(nextProps) {
    const data = this.commentModel.getCommentList(nextProps);

    if (data.length >= 1) {
      this.setState({
        data,
      });
    }
  }

  /**
   * TODO: 获取comment
   * 然后加载到该页
   */
  handleLoaded = ({isOK}) => {
    if (isOK) {
      this.loadComment();
    }
  };

  /**
   * componentWillUnmount
   */
  componentWillUnmount() {
    // TODO: componentWillUnmount移除componentDidMount对应的监听 ##
    this.commentModel.removeDataChangeListener(
      DataChangeType.ADD_COMMENT,
      this.handleUpdate
    );
    this.commentModel.removeDataChangeListener(
      DataChangeType.GET_COMMENTLIST,
      this.handleUpdate
    );
    this.commentModel.removeDataChangeListener(
      DataChangeType.UPDATED_COMMENT,
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
      case EventType.COMMENT_ADD_CLICK:
        this.handleSaveClick(params);
        break;
      default:
        super.handleEvent(eventType, params);
        break;
    }
  }

  /**
   * handle update event
   * @param {object} data - update status data
   */
  handleUpdate = ({isOK}) => {
    if (isOK) {
      // 添加或者修改成功后，
      this.handleEvent(EventType.COMMENT_ADD_SUCCESS);
    }
  };

  /**
   * handle form submit event
   * @param {object} e - event object
   */
  handleSaveClick(e) {
    const params = {
      userId: this.state.userId,
      userName: this.state.userName,
      comment: this.state.comment,
    };

    super.handleEvent(EventType.COMMENT_ADD_CLICK, params);
  }

  uhandleChange = (e) => {
    this.setState({
      userName: e.target.value,
    });
  };

  chandleChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };

  // eslint-disable-next-line require-jsdoc
  render() {
    return (
      <div>
        <form>
          <div>
            <label>用户名</label>
            // 能不能在这里判断页面所处的状态，然后决定ueserName的输入框能否输入
            // if(this.state){不能输入}else{可以输入}
            <input
              type="text"
              className="form-control"
              // 如果是修改状态如何将this.state.userName 填充在输入框中呢？
              value={this.state.username} // 这个value和onChange到底啥关系
              onChange={this.uhandleChange}
            />
          </div>
          <div>
            <label>内容</label>
            <textarea
              className="form-control" rows="6"
              value={this.state.comment}
              onChange={this.chandleChange}
            />
          </div>
          <div>
            <div>
              <button
                className=""
                onClick={
                  e => this.handleEvent(EventType.COMMENT_ADD_CLICK)
                }
                type="button"
              >
                {this.t('btn.add')}
              </button>
              <button
                className=""
                onClick={
                  e => this.handleEvent(EventType.COMMENT_COMMENTLIST_CLICK)
                }
                type="button"
              >
                {this.t('btn.commentList')}
              </button>
            </div>
          </div>
        </form>
      </div>
    )

  }

}

export default Comment;
