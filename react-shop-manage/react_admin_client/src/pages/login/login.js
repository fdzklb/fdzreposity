import React, {Component} from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import {reqLogin} from '../../api'
import memoryUtil from '../../utils/memoryUtil'
import storeUtil from '../../utils/storeUtil'
import {Redirect} from 'react-router-dom'
import './login.less'


class Login extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async(err, values) => {
            if(!err){
                const {username,password} = values
                const result = await reqLogin(username, password)
                if(result.status===0){
                    message.success('登陆成功')

                    const user = result.data
                    memoryUtil.user = user  //如果登陆将user信息存到内存
                    storeUtil.saveUser(user) //保存到localstorge
                    this.props.history.replace('/admin')
                } else {
                    message.error(result.msg)
                }
            }

        })
      };

    render(){
        //如果内存中有用户信息，跳过登陆界面
        const user = memoryUtil.user
        if(user && user._id){
            return <Redirect to='./admin'/>
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login'>
                <header className='login-header'>
                    <h1>后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <div className='login-content-form'>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <h2>用户登录</h2>
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    initialValue: 'admin',
                                    //声明式验证
                                    rules: [{ required: true, message: '' },
                                            {min: 4,message:'长度至少为4位'},
                                            {max: 12,mseesage: '长度最长为12位'},
                                            {patten: /^[a-zA-Z0-9_]+$/, message:'用户名必须由英文、数字、下划线组成'}
                                        ],
                                })(
                                    <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}//prefix input框前面的小图标
                                    placeholder="Username"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                            {getFieldDecorator('password', {
                                rules:  [{ required: true, message: '' },
                                            {min: 4,message:'长度至少为4位'},
                                            {max: 12,mseesage: '长度最长为12位'},
                                            {patten: /^[a-zA-Z0-9_]+$/, message:'密码必须由英文、数字、下划线组成'}
                                        ],
                            })(
                                <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                                />,
                            )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登陆
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                   
                </section>
            </div>
        ) 
    }
}

const WrapLogin = Form.create()(Login);
export default WrapLogin