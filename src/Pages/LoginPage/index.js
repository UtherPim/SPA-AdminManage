import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Form, Icon, Checkbox, Button, Input, message } from 'antd'
import './index.css'

const FormItem=Form.Item;

class LoginPage extends React.Component{
    constructor (props){
        super (props)
        this.state={
            userName: '',
            userPwd: '',
            isRemember: true,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(this.state.isRemember){
                    this.remembered()
                }
                console.log('Received values of form: ', values);
                message.info("login success! welcom for you!",1,()=>{
                    window.location.pathname='/system/home'
                })
            }
        });
    }

    init=()=>{      
        let name=document.getElementById('userName').value;       
        if(name){
            for(let i=0; i<window.localStorage.length; i++){
                if(localStorage.key(i) === name){
                    this.setState({
                        userName: name,
                        userPwd: localStorage.getItem(name)
                    })
                    this.props.form.setFieldsValue({'password':localStorage.getItem(name)})
                }
            }
        }      
    }

    checkedChange=(e)=>{
        this.setState({
            isRemember:e.target.checked
        })
    }

    remembered=()=>{
        const {userName, password} = this.props.form.getFieldsValue(['userName','password'])
        localStorage.setItem(userName,password)
    }

    render (){
        const { getFieldDecorator } = this.props.form;

        return (
            <div className='container'>
                <Card style={{ width:400,height:300 }} className='login-card flex-center'>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" onChange={this.init} />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: this.state.isRemember,
                            })(
                                <Checkbox onChange={this.checkedChange} >Remember me</Checkbox>
                            )}
                            <Link to="/forgotPwd" style={{ float: 'right' }}>Forgot password</Link>
                            <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                                Log in
                            </Button>
                            Or <Link to='/register'>register now!</Link>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create()(LoginPage)