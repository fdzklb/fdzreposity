import BaseModel from './baseModel';
import DataChangeType from './dataChangeType';
import getCommentListGraghql from './graphql/getCommentList.graphql';
import insertCommentGraghql from './graphql/insertComment.graphql';
import deleteCommentGraghql from './graphql/deleteComment.graphql';
import updateCommentGraghql from './graphql/updateComment.graphql';

// TODO: 删掉没用的代码（account信息等）

/**
 * Comment Model
 */
class CommemtModel extends BaseModel {

  /**
   * Comment Model
   */
  constructor() {
    super();
    this.comment = [];
    this.result = '';
  }

  /**
   * insert comment
   * @param {object} params {userId:Number, comment:''}
   */
  insertComment(params) {
    this.dataSource.query(insertCommentGraghql, params)
      .then(result => {
        this.handleDataChange(DataChangeType.ADD_COMMENT, {
          isOK: !!result.userId,
        });
      })
      .catch(err => {
        this.handleDataChange(DataChangeType.ADD_COMMENT, {
          isOK: false,
        });
      });

  }

  /**
   * update comment
   * @param {object} params {userId:Number, comment:''}
   */
  updateComment(params) {
    this.dataSource.query(updateCommentGraghql, params)
      .then(result => {
        this.handleDataChange(DataChangeType.UPDATED_COMMENT, {
          isOK: !!result.userId,
        });
      })
      .catch(err => {
        this.handleDataChange(DataChangeType.UPDATED_COMMENT, {
          isOK: false,
        });
      });

  }

  /**
   * delete comment
   * @param {object} params {userId:Number}
   */
  deleteComment(params) {
    this.dataSource.query(deleteCommentGraghql, params)
      .then(result => {
        this.handleDataChange(DataChangeType.DELETE_COMMENT, {
          isOK: !!result.userId,
        });
      })
      .catch(err => {
        this.handleDataChange(DataChangeType.DELETE_COMMENT, {
          isOK: false,
        });
      });
  }

  /**
   * get comment
   * @param {object} params {userId:Number or userName:''}
   * 从gate拿到数据，放到缓存
   */
  getdata(params) {
    this.dataSource.query(getCommentListGraghql, params)
      .then(result => {
        result.filter = (comm) => {
          this.comment.push(comm)
        };
        this.handleDataChange(DataChangeType.GET_COMMENTLIST, {
          isOK: true,
        });
      }
      )
  }

  /**
   * inspect comment is in cache or not
   * @param {object} params {userId:Number or userName:''}
   * 判断是否在缓存中,result为在缓存中返回的查询结果
   */
  isIncache(params) {
    if(!this.result) {
      if (params.userId) {
        this.comment.filter = (comment) => {
          if (comment.userId === params.userId) {
            this.handleDataChange(DataChangeType.GET_COMMENTLIST, {
              isOK: true,
            });
          }
        }
      } else if (params.userName) {
        this.comment.filter = (comment) => {
          if (comment.useruserName === params.userName) {
            this.handleDataChange(DataChangeType.GET_COMMENTLIST, {
              isOK: true,
            });
          }
        }
      } else {
        return false
      }
    }

    const res = this.result;
    this.result = '';

    return res
  }

  /**
   * get commentList
   * @param {object} params {userId:Number or String}
   * @param nocache{Boolean}
   * 传过来的是userId或者userName，未强制请求gateway,先走缓存
   * 缓存未找到走gateway，将返回的数据存入缓存
   */
  getCommentList(params, nocache) {
    if (params.userId || params.userName && !nocache) {
      if (!this.isIncache(params)) {
        this.getdata(params)
      }
    }else{
      this.getdata(params)
    }
  }

}

export default CommemtModel;
