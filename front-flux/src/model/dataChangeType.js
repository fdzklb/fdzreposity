/**
 * DataChange Type
 * @description used in listener emit
 */
class DataChangeType {

  static DEFAULT = 'datachange';
  static LOADED = 'loaded';
  static UPDATED = 'updated';
  static DELETED = 'deleted';
  static VERIFIED = 'verified';
  static READY = 'ready';
  static CHANGE = 'change';

  /* 其它需要区分的类型 */
  static PWD_UPDATED = 'pwd_updated';

  static UPDATED_COMMENT = 'update_comment';
  static ADD_COMMENT ='add_comment';
  static GET_COMMENTLIST = 'get_commentList';
  static DELETE_COMMENT = 'delete_comment';

}

export default DataChangeType;
