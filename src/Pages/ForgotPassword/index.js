import React from 'react'
import { Card, Form, Button, Input, message, Col, Row, Select, } from 'antd'
import './index.css'
import CountdownButton from '../components/countdownButton'

const FormItem=Form.Item;
const Option=Select.Option
const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

class ForgotPassword extends React.Component {
    constructor (props){
        super(props);
        this.state={
            visible:false
        }
    }
    
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((error,value)=>{
            if(!error){
                message.info("modified success!",1,()=>{
                    window.location.pathname = '/login'
                })
            }
        })
    }

    render (){
        const { getFieldDecorator } = this.props.form;

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
          })(
            <Select style={{ width: 70 }}>
              <Option value="86">+86</Option>
              <Option value="87">+87</Option>
            </Select>
          );

        return (
            <div className='container'>
                <Card style={{ width:450,height:250 }} className='login-card'>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem
                            {...formItemLayout}
                            label="Phone Number"
                        >
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: 'Please input your phone number!' }],
                            })(
                                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Captcha"
                            extra="We must make sure that your are a human."
                        >
                            <Row gutter={8}>
                                <Col span={12}>
                                    {getFieldDecorator('captcha', {
                                        rules: [{ required: true, message: 'Please input the captcha you got!' }],
                                    })(
                                        <Input />
                                    )}
                                </Col>
                                <Col span={10}>
                                    <CountdownButton name='Get captcha'></CountdownButton>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                                Submit
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create()(ForgotPassword)