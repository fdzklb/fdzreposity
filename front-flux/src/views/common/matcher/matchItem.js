/**
 * Match Item
 */
class MatchItem {

  // Match Full Type
  static MatchTypeFull = 'full';

  // Match with pattern
  static MatchTypeRegular = 'regular';

  /**
   * Match Item
   * @param {string} matchType match type
   * @param {string} urlPattern url pattern
   * @param {string} menuKey menu key
   */
  constructor(matchType, urlPattern, menuKey) {
    this.matchType = matchType;
    this.urlPattern = urlPattern;
    this.menuKey = menuKey;
  }

  /**
   * is match url
   * @param {string} url url
   * @returns {object} is match
   */
  isMatch(url) {
    let matchFlag = false;

    switch (this.matchType) {
      case MatchItem.MatchTypeFull:
        matchFlag = this.matchFull(url);
        break;
      case MatchItem.MatchTypeRegular:
        matchFlag = this.matchRegular(url);
        break;
      default:
        break;
    }

    return matchFlag;
  }

  /**
   * match full
   * @param {string} url url to match
   * @returns {boolean} is match
   */
  matchFull(url) {
    return url === this.urlPattern;
  }

  /**
   * match regular
   * @param {string} url url to match
   * @returns {boolean} is match
   */
  matchRegular(url) {
    return new RegExp(this.urlPattern).test(url);
  }

}

export default MatchItem;
