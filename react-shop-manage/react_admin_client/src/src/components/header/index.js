import React, { Component } from 'react';
import {Modal, Button, message} from 'antd'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {LOG_OUT} from '../../pages/login/action-type'
import store from '../../utils/storeUtils'
import {reqWeather,reqAddress} from '../../api'
import {getCurrentDate} from '../../utils/common'
import './index.less'


class HeaderSelf extends Component {
  state = { 
    weather:'',
    date:getCurrentDate(new Date()),
    weatherText:'',
    address:''
   }
  exitAhref={
    href:'#',
    text:'退出'
  }
  exitConfirm=(e)=>{
    e.preventDefault();
    Modal.confirm({
      title:'退出',
      content: '确定退出？',
      okText:'退出',
      cancelText:'取消',
      confirmLoading:true,
      onOk:()=> {
        return new Promise((resolve, reject) => {
          this.exitTimerID=setTimeout(()=>{
            store.clearAll()
            store.user={}
            resolve({})
            this.props.logout()
            //通过清除store数据实现跳转到login页，而不是直接控制路由跳转
            //this.props.history.replace('/login')
          },500);
        }).catch(() => console.log('Oops errors!'));
      },
    })
  }
  
  async getWeather(city){
    const {date,dayPictureUrl,weather} = await reqWeather(city)
    this.setState({
      weather:date,
      imgSrc:dayPictureUrl,
      weatherText:weather
    })
  }

  async getAddress(){
    try {
      const {address,address_detail}= await reqAddress()
      let {city}=address_detail
      if(!city){city='武汉'}
      this.getWeather(city)
      this.setState({
        address
      })
    } catch (error) {
      message.error('定位失败')
    }
  }

  componentDidMount(){
    this.getAddress()
    this.getWeather(this.state.address)
    this.timerID = setInterval(()=>{
      this.clock()
    },1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    clearInterval(this.exitTimerID);
  }

  clock(){
    this.setState({
      date:getCurrentDate(new Date())
    })
  }

  render() {
    const {headTitle,userInfo} = this.props


    return (
      <div className='header'>
        <div className='header-top'>
          <span>欢迎您，{userInfo.username}</span>
          <Button type='link' onClick={this.exitConfirm}>退出</Button>
        </div>
        <div className='header-buttom'>
          <span className='getSource'>
             <h1>{headTitle}</h1>
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

HeaderSelf.propTypes={
  headTitle:PropTypes.string.isRequired
}
// 该回调函数必须返回一个纯对
const mapStateToProps = (state)=>({
  headTitle:state.getHeadTitle,
  userInfo:state.loginUserInfo
})
//如果传递的是一个函数，该函数将接收一个 dispatch 函数，然后由你来决定如何返回一个对象
const mapDispatchToProps=(dispatch)=>{
  return {
    logout:()=>{
      dispatch({
        type:LOG_OUT,
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(HeaderSelf))