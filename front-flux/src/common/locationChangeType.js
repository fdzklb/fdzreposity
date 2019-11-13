/**
 * Location Change Type
 * @description browser location stack change type
 */
class LocationChangeType {

  // browser location back
  static BACK = 'back';

  // brower location forward
  static FORWARD = 'forward';

  // brower location replace current stack top
  static REPLACE = 'replace';

  // brower location forward and show url params
  static FORWARD_SHOW_PARAMS = 'forward_show_params';

  // brower location replace and show url params
  static REPLACE_SHOW_PARAMS = 'forward_show_params';

}

export default LocationChangeType;
