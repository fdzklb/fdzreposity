/**
 * Handler Type Constant definition
 * @author sharon
 * @since 2018/04/19
 * @description 通过key-value定义Handler Type，value为新增handler文件名
 */
module.exports = {
  /* -- Auth Module --*/
  GET_TOKEN: 'getTokenHandler',

  /* -- Account Module --*/
  LOGIN: 'loginHandler',
  GET_USER: 'getUserHandler',
  MUTATE_USER: 'mutateUserHandler',
  CHANGE_PASSWORD: 'changePasswordHandler',

  /* --Comment Module --*/
  GET_COMMENT_LIST: 'getCommentListHandler',
  DELETE_COMMENT: 'deleteCommentHandler',
  INSERT_COMMENT: 'insertCommentHandler',
  UPDATE_COMMENT: 'updateCommentHandler',
};
