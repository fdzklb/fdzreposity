import React from 'react'
import './index.less'
import {Link, withRouter} from 'react-router-dom'
import {reqWeather, reqAddress} from '../../api'
import menuList from '../../config/menuList'
// import logo from '../../assets/imgs/logo.png'
import './index.less'
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;
class LeftNav extends React.Component {

    getMenuNodes = (menuList) =>{
        return menuList.map(item =>{
            if(!item.children){
                return(
                    <Menu.Item key={item.key}>
                    <Link to={item.key}>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </Link>
                </Menu.Item>
                )
            }
            else{
                const cItem = item.children.find(cItem => cItem.key===path)
                if(cItem){
                    this.openKey = item.key
                }
               
                return(
                 <SubMenu
                    key={item.key}
                    title={
                        <span>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                        </span>
                    }
                    >
                        {this.getMenuNodes(item.children)}
                 </SubMenu>
                )
            }
        })
    }
    componentWillMount (){
        this.menuNodes = this.getMenuNodes(menuList)
    }
    render(){
        const path = this.props.location.pathname
        const openKey = this.openKey
        return (
            <div to='/home' className='left-nav'>
                <Link to='.' className='left-nav-header'>
                    <img src='' alt=''/>
                    <h1>dffff</h1>s
                </Link>
             <Menu
                selectedKeys={[path]}
                defaultOpenKeys={[openKey]}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
            >
            {this.menuNodes}
           </Menu>
           </div>
        )
    }
}
/*
  withRouter高阶组件
  包装路由组件，返回一个带有history,location,match属性的新组件
*/
export default withRouter(LeftNav)