import { Card, Button, Checkbox, Flex, Form, Input, Modal } from 'antd';
import axios from 'axios';
import { useState } from 'react';



const LoginForm = ({ setUser, setUsername, setSigningUp }) => {

    const [failedLogin, setFailedLogin] = useState(false);

    const onFinish = async (values) => {
        try{
        const loginResponse = await axios.post("http://localhost:5999/users/login", { username: values.username, password: values.password });
        console.log(loginResponse.data.data)
        if (loginResponse.data.success) {
            setUsername(values.username);
            setFailedLogin(false);
            setUser(loginResponse.data.data);
        } else {
            setFailedLogin(true);
        }}catch(error){
            setFailedLogin(true);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    const handleModalClose = () => {
        setFailedLogin(false);
    }

    return <>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card title="Login Form" style={{ maxWidth: 800, margin: 'auto' }}>
            {failedLogin && <div style={{background:'red', fontSize:'1.3rem', padding:'8px', height:'2rem', color:'white',
                alignItems:'center', justifyContent:'center', borderRadius:'4px', marginBottom:'15px'}}>
            Incorrect username or password
            </div>}
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Flex align='center' justify='space-between'>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                        <Form.Item><Button type='text' onClick={()=>setSigningUp(true)}>Sign Up</Button></Form.Item>
                    </Flex>
                </Form>
            </Card>
        </div>
    </>
}
export default LoginForm;