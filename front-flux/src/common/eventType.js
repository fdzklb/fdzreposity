/**
 * Event Type
 * @description define all event type
 */
class EventType {

  // Navigation
  static MENU_DASHBOARD_CLICK = 'dashboard_click';
  static MENU_ACCOUNT_CLICK = 'account_click';
  static MENU_LOGOUT_CLICK = 'logout_click';
  static MENU_REPORT_CLICK = 'report_click';
  static ERROR = 'error';

  // Comment
  static MENU_COMMENT_CLICK = 'comment_click';
  static REDIRECT_COMMENT = 'redirect_comment';
  static COMMENT_ADD_CLICK = 'comment_add_click';
  static COMMENT_ADD_SUCCESS = 'comment_add_success';
  static COMMENT_SEARCH_SUCCESS = 'comment_search_success';
  static COMMENT_COMMENTLIST_CLICK = 'comment_commentList_success';

  // CommentList
  static COMMENTLIST_DELETE_CLICK = 'commentList_delete_click';
  static COMMENTLIST_SEARCH_CLICK = 'commentList_search_click';
  static COMMENTLIST_SEARCH_SUCCESS = 'commentList_search_success';
  // static REDIRECT_COMMENTLIST = 'redirect_commentList';
  static COMMENTLIST_DELETE_SUCCESS = 'commentList_delete_success';
  static COMMENTLIST_EDIT_CLICK = 'commentList_edit_click';

  // Redirect
  static REDIRECT_LOGIN = 'redirect_login';
  static REDIRECT_DASHBOARD = 'redirect_dashboard';
  static REDIRECT_ACCOUNT = 'redirect_account';
  static REDIRECT_REPORT = 'redirect_report';
  static REDIRECT_SECOND = 'redirect_second';

  // i18next
  static CHANGE_LANGUAGE = 'change_language';

  // RootView
  static COPY_CLICK = 'copy_click';

  // Home Module
  static MENU_SIDEBAR_CLICK = 'menu_sidebar_click';

  // Login Module
  static LOGIN_INPUT_ACCOUNT_CHANGE = 'login_input_account';
  static LOGIN_INPUT_PASSWORD_CHNAGE = 'login_input_password';
  static LOGIN_CLICK = 'login_click';
  static LOGIN_SUCCESS = 'login_success';

  // Paginator Module
  static PAGINATOR_PAGE_CHANGE = 'paginator_page_change';

  // Account Module
  static ACCOUNT_TAB_CHANGE = 'account_tab_change';
  static ACCOUNT_EDIT_CLICK = 'account_edit_click';
  static ACCOUNT_EDIT_SUCCESS = 'account_edit_success';
  static CANCEL_CLICK = 'cancel_click';
  static ACCOUNT_SAVE_CLICK = 'account_save_click';
  static CONTACT_ADD = 'contact_add';
  static CONTACT_DEL = 'contact_del';
  static CONTACT_CHANGE = 'contact_change';
  static CONTACT_SELECTED_DEL = 'contact_select_del';
  static PASSWORD_SAVE_CLICK = 'password_save_click';
  static CHANGE_PSW_RESULT = 'change_psw_result';

  // Second View Demo
  static SECOND_CLICK = 'second_click';
  static SECOND_BACK_CLICK = 'second_back_click';

}

export default EventType;
