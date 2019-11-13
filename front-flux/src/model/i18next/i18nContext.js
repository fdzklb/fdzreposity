/**
 * default options
 */
let defaultOptions = {
  wait: false,
  withRef: false,
  bindI18n: 'languageChanged loaded',
  bindStore: 'added removed',
  translateFuncName: 't',
  nsMode: 'default',
  usePureComponent: false,
};

let i18n;

/**
 * set default options
 * @param {object} options default options
 */
export function setDefaults(options) {
  defaultOptions = { ...defaultOptions, ...options };
}

/**
 * get default options
 * @returns {object} default options
 */
export function getDefaults() {
  return defaultOptions;
}

/**
 * set the i18n instance
 * @param {object} instance - i18n instance
 */
export function setI18n(instance) {
  i18n = instance;
}

/**
 * get the i18n instance
 * @returns {object} instance
 */
export function getI18n() {
  return i18n;
}

/**
 * build the third plugin
 */
export const reactI18nextModule = {
  type: '3rdParty',

  init(instance) {
    setDefaults(instance.options.react);
    setI18n(instance);
  },
};
