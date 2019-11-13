// TODO: eslint 规则不要规避，请遵循（不止当前这个文件）
import React from 'react';
import BaseView from '../../baseView';
import ModelType from '../../../model/modelType';
import ModelFactory from '../../../model/modelFactory';
import EventType from '../../../common/eventType';
import DataChangeType from '../../../model/dataChangeType';
import './fdz.css';

/**
 *  Edit Component
 */
class CommentList extends BaseView {

  /**
   * @param {object} props react props
   */
  constructor(props) {
    super(props);

    this.commentModel = ModelFactory.createModel(ModelType.COMMENT);
    
    this.state = {
      // TODO: 当前这个只需初始化 data:[]
      data: [
        // {userId: '', userName: '', comment: ''},
      ],
      userInput: '',
      // TODO: userInput: ''
    };
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    // TODO: 需要监听add，update等操作comment事件，在回调中判断如果add，update等成功，需重新去获取commentList
    this.commentModel.addDataChangeListener(
      DataChangeType.DELETE_COMMENT,
      this.handleDelete,
    );
    this.commentModel.addDataChangeListener(
      DataChangeType.ADD_COMMENT,
      this.handleLoaded,
    );
    this.commentModel.addDataChangeListener(
      DataChangeType.GET_COMMENTLIST,
      this.handleLoaded,
    );
    this.loadCommentList({}, true);
  }

  /**
   * componentWillUnmount
   */
  componentWillUnmount() {
    this.commentModel.removeDataChangeListener(
      DataChangeType.DELETE_COMMENT,
      this.handleDelete,
    );
    this.commentModel.removeDataChangeListener(
      DataChangeType.ADD_COMMENT,
      this.handleLoaded,
    );
    this.commentModel.removeDataChangeListener(
      DataChangeType.GET_COMMENTLIST,
      this.handleUpdate,
    );
  }

  /**
   * Event Handle
   * @param {string} eventType - event types
   * @param {object} params - event params
   */
  handleEvent(eventType, params) {
    switch (eventType) {
      case EventType.COMMENTLIST_SEARCH_CLICK:
        this.handleSaveClick(eventType, params);
        break;
      case EventType.COMMENTLIST_EDIT_CLICK:
        this.handleEditClick(eventType, params);
        break;
      case EventType.COMMENTLIST_DELETE_CLICK:
        this.handleEDClick(eventType, params);
        break;
      default:
        super.handleEvent(eventType, params);
        break;
    }
  }

  /**
   * load account data
   * @param {object} params {userId:Number or String}
   * @param istrue{Boolean}
   */
  loadCommentList(params, istrue) {
    const data = this.commentModel.getCommentList(params, istrue);

    if (data.length >= 1) {
      this.setState({
        data,
      });
    }
  }

  /**
   * handle Account loaded event
   * @param {object} data - loaded status
   */
  handleLoaded = ({isOK}) => {
    console.log('handleLoaded', {isOK});

    if (isOK) {
      const param = this.state.userInput;
      this.loadCommentList(param, false);
    }
  };

  /**
   * handle update event
   * @param {object} data - update status data
   */
  /**
   * handle update event
   * @param {object} data - update status data
   */
  handleUpdate = ({ isOK }) => {
    console.log('handleUpdate');

    if (isOK) {
      this.loadCommentList();
    }
  };

  /**
   *删除是否成功
   */
  handleDelete = (data) => {
    if (data) {
      super.handleEvent(EventType.COMMENTLIST_DELETE_SUCCESS, data);
    }
  };

  handleEditClick = (eventType, params) => {// 到底需不需要在这里对userId和userName进行封装成json对象
    const param = {
      userId: params,
    };
    super.handleEvent(eventType, param);
  };

  handleSaveClick(e) {
    const params = {
      userName: this.state.userInput,
    };

    super.handleEvent(EventType.COMMENTLIST_SEARCH_CLICK, params);
  }

  // TODO: 更新this.state.userInput的值
  handleChange = (e) => {
    e.preventDefault();
    this.userInput = e.target.value
  };

  /**
   * render
   * @returns {object} jsx
   */
  render() {
    const {isLoading, data} = this.state;
    console.log(data);
    const renderTodos = data.map((todo, index) => (
      // eslint-disable-next-line react/jsx-key
      <ul className="list-group">
        <li className="list-group-item">
          <div className="btn btn-default pull-right">
            <button
              onClick={
                () => this.handleEvent(EventType.COMMENTLIST_DELETE_CLICK,
                  todo.userId)
              }
              type="button" className="btn btn-default pull-right"
            >
              delete
            </button>
     
            <button onClick={
              () => this.handleEvent(EventType.COMMENTLIST_EDIT_CLICK,
                todo.userId)
            } type="button" className="btn btn-default pull-right"
            >
              edit
            </button>
          </div>
          <p className="centence">{todo.userName}说{todo.comment}
          </p>
        </li>
      </ul>
    ));

    return (
      <div>
        <form>
          <div>
            <label>用户名</label>
            <input
              type="text"
              className="form-control"
              // TODO: userInput
              value={this.state.userInput}
              onChange={this.handleChange}
            />
            <button
              className=""
              onClick={
                e => this.handleEvent(EventType.COMMENTLIST_SEARCH_CLICK)
              }
              type="button"
            >
              搜索
            </button>
          </div>
        </form>
        <ul>
          {renderTodos}
        </ul>
      </div>
    );
    
  }

}

export default CommentList
