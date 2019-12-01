import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import storeUtils from './utils/storeUtil'
import memoryUtil from './utils/memoryUtil'

//读取local中的数据保存到内存中
const user = storeUtils.getUser()
memoryUtil.user = user

ReactDom.render(<App/>, document.getElementById('root'))