/**
 * Command Type list
 * the command is used to send message from parent to children
 */
class CommandType {

  /* transfer view */
  static TRANSFER_VIEW = 'transfer_view';

  /* update view params */
  static UPDATE_VIEW_PARAMS = 'update_view_params';

  /* copy */
  static COPY_SUCCESS = 'copy_success';
  static COPY_FAIL = 'copy_fail';

  /* i18n reload */
  static RELOAD_I18N = 'reload_i18n';

  /* toast */
  static TOAST = 'toast';

}

export default CommandType;
