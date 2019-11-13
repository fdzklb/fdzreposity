import ChainComponent from '../core/chainComponent';
import ModelFactory from '../model/modelFactory';
import ModelType from '../model/modelType';

/**
 * Base View, all view must extends the component
 */
class BaseView extends ChainComponent {

  /**
   * BaseView
   * @param {object} props props
   */
  constructor(props) {
    super(props);
    // i18n model
    this.i18n = ModelFactory.createModel(ModelType.I18N);
    // i18n translate
    this.t = this.i18n.t;
  }

}

export default BaseView;
