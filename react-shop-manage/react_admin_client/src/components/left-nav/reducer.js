import { SETHEADTITLE } from './action-type'
import {LOG_OUT} from '../../pages/login/action-type'


export default (state = '首页', action) => {
  switch (action.type) {
    case SETHEADTITLE:
      return action.data
    case LOG_OUT:
    return state = '首页' //暂时解决的办法
    default:
      return state
  }
}