import BaseModel from './baseModel';
import i18nInstance from './i18next/i18n';
import { getDefaults, getI18n } from './i18next/i18nContext';
import LocalStorage from '../dataUtil/localStorage';
import LocalStoreKey from '../common/localStoreKey';
import DataChangeType from './dataChangeType';

let removedIsInitialSSR = false;

/**
 * I18n Model
 * @description base on i18next
 */
class I18nModel extends BaseModel {

  /**
   * I18nModel
   * @param {object} i18n i18next instance
   * @param {string|object} ns namespace
   */
  constructor(i18n, ns) {
    super();

    this.localStorage = LocalStorage.getInstance();
    this.i18n = i18n || i18nInstance || getI18n();
    this.namespaces = ns || this.i18n.options && this.i18n.options.defaultNS;

    if (typeof this.namespaces === 'string') {
      this.namespaces = [ this.namespaces ];
    }

    const i18nOptions =
      this.i18n && this.i18n.options && this.i18n.options.react || {};

    this.options = { ...getDefaults(), ...i18nOptions };

    // provider SSR: data was set in provider and ssr flag was set
    if (this.i18n.options && this.i18n.options.isInitialSSR) {
      this.options.wait = false;
    }

    /*
     * get the language
     * if local language is existed, return the local
     * else return the language of config
     */
    const localLanguage = this.localStorage.getItem(
      LocalStoreKey.CURRENT_LANGUAGE
    );
    this.language = localLanguage || this.i18n.options.lng;
    this.i18n.options.lng = this.language;

    this.ready =
      !!this.language &&
      this.namespaces.every(ns =>
        this.i18n.hasResourceBundle(this.language, ns)
      );

    this.t = this.getI18nTranslate();
  }

  /**
   * init i18next instance
   */
  init() {
    const bind = () => {
      if (this.options.bindI18n && this.i18n) {
        this.i18n.on(this.options.bindI18n, this.onI18nChanged);
      }

      if (this.options.bindStore && this.i18n.store) {
        this.i18n.store.on(this.options.bindStore, this.onI18nChanged);
      }
    };

    this.mounted = true;
    this.i18n.loadNamespaces(this.namespaces, () => {
      const ready = () => {
        if (this.mounted && !this.ready) {
          this.ready = true;
          this.handleDataChange(DataChangeType.READY, {});
        }

        if (this.options.wait && this.mounted) bind();
      };

      if (this.i18n.isInitialized) {
        ready();
      } else {
        const initialized = () => {
          // due to emitter removing issue in i18next we need to delay remove
          setTimeout(() => {
            this.i18n.off('initialized', initialized);
          }, 1000);
          ready();
        };

        this.i18n.on('initialized', initialized);
      }
    });

    if (!this.options.wait) bind();
  }

  /**
   * destory i18next instance
   */
  destory() {
    this.mounted = false;

    if (this.onI18nChanged) {
      if (this.options.bindI18n) {
        const p = this.options.bindI18n.split(' ');
        p.forEach(f => this.i18n.off(f, this.onI18nChanged));
      }

      if (this.options.bindStore) {
        const p = this.options.bindStore.split(' ');
        p.forEach(
          f => this.i18n.store && this.i18n.store.off(f, this.onI18nChanged)
        );
      }
    }
  }

  /**
   * Get current language
   * @returns {string} current language
   */
  getLanguage() {
    return this.language;
  }

  /**
   * change current language
   * @param {string} lng language for short
   */
  changeLanguage(lng) {
    this.i18n.changeLanguage(lng);
  }

  /**
   * emit change when language change
   * @param {string} lng language
   * @param {string} ns namespace
   */
  onI18nChanged = (lng, ns) => {
    if (!this.mounted) return;

    // reset the translate
    this.t = this.getI18nTranslate();

    // reset the language
    if (typeof lng === 'string') {
      this.language = lng;
      this.localStorage.setItem(LocalStoreKey.CURRENT_LANGUAGE, lng);
    }

    // 首次加载完成后
    if (this.ready || !this.options.wait) {
      /*
       * remove ssr flag set by provider -
       * first render was done from now on wait if set to wait
       */
      if (
        this.i18n.options &&
        this.i18n.options.isInitialSSR &&
        !removedIsInitialSSR
      ) {
        removedIsInitialSSR = true;
        setTimeout(() => {
          delete this.i18n.options.isInitialSSR;
        }, 100);
      }
    }

    // emit change
    this.handleDataChange(DataChangeType.CHANGE, {
      i18nLoadedAt: new Date(),
      lng: this.language,
    });
  };

  /**
   * get the current translate
   * @returns {object} translate function
   */
  getI18nTranslate() {
    return this.i18n.getFixedT(
      null,
      this.options.nsMode === 'fallback' ? this.namespaces : this.namespaces[0]
    );
  }

}

export default I18nModel;
