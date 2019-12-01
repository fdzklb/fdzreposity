import axios from 'axios'
import {message} from 'antd'
/** 
 * 在外层再包一层promise对象，对请求异常时马上统一处理，而不是返回到ui层进行再处理

*/
export default function  ajax(url ,data={},type='GET'){
    return new Promise((resolve, reject) =>{
        let promise
        switch(type){
            case 'GET':
                promise = axios.get(url,{
                    params: data
                })
            case 'POST':
                promise = axios.post(url,data)
        }
        promise.then(response => {
            resolve(response.data)
        }).catch(error =>{
            message.error("请求出错"+error.message)
        })
    })
}