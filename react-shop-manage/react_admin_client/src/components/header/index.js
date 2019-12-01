import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
// import memoryUtil
import store from '../../utils/storeUtils'
import {reqWeather,reqAddress} from '../../api'
import {getCurrentDate} from '../../utils/common'
import './index.less'
import { userInfo } from 'os'

export default class Header extends Component {
    state = {
        weather:'',
        data:getCurrentDate(new Date()),
        weatherText:'',
        imgSrc:'',
        address:''
    }

    componentDidMount() {
        this.setState({
            data:setInterval(() => {
                getCurrentDate(new Date)
            }, 1000)
        })
    }

    componentWillUnmount(){

    }

    exitConfirm=(e)=>{
        e.preventDefault();
        Modal.confirm({
          title:'退出',
          content: '确定退出？',
          okText:'退出',
          cancelText:'取消',
          confirmLoading:true,
          onOk:() => {
            return new Promise((resolve, reject) => {
              this.exitTimerID=setTimeout(()=>{
                store.clearAll()
                // store.remove('user_key')
                store.user=null
                resolve(null)
                this.props.logout()
                this.props.history.replace('/')
              },500);
            }).catch(() => console.log('Oops errors!'));
          },
        })
      }

    async getWeather(city) {
        const {data,dayPictureUrl,weather} = await reqWeather(city)
        this.setState({
            weather:data,
            imgSrc:dayPictureUrl,
            weatherText:weather
        })
    }


  render(){

    return ( 
        <div className='header'>
            <div className='header-top'>
                <span>
                    欢迎您，{userInfo.username}
                </span>
                <Button type='link' onClick={this.exitConfirm}>退出</Button> {/*看着像button的链接按钮*/}
            </div>

            <div className='header-buttom'>
                <span className='getSource'>
                <LinkA params={this.params}/>
                </span>
                <span>{this.state.address}</span>
                <span>{this.state.weather}</span>
                <span>{this.state.date}</span>
                <span>{this.state.weatherText}</span>
                <span className='header-buttom-weather-img'><img src={this.state.imgSrc} alt=''></img></span>
            </div>
        </div>
    );
  } 
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(HeaderSelf))