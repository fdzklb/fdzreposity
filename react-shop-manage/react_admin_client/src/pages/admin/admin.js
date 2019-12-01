import React, { Component } from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import memoryUtil from '../../utils/memoryUtil'
import Home from '../home/home'
import Role from '../role/role'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;


export default class Admin extends Component {
    render(){
        const user = memoryUtil.user
        if(!user || !user.user_id) {
            return <Redirect to='/'/>
        }
        return (
          <Layout >
            <Sider>Sider</Sider>
            <Layout>
                <Header>Header</Header>
                <Content style={{margin:20, background:'#fff'}}>
                    <Switch>
                        <Route path='/home' component={Home}/>
                        <Route path='/category' component={Category}/>
                        <Route path='/product' component={Product}/>
                        <Route path='/role' component={Role}/>
                        <Route path='/user' component={User}/>
                        <Route path='/charts/bar' component={Bar}/>
                        <Route path='/charts/line' component={Line}/>
                        <Route path='/charts/pie' component={Pie}/>
                        <Redirect to='/home' />
                    </Switch>
                </Content>
                <Footer>Footer</Footer>
            </Layout>
         </Layout>
        )
    }
}