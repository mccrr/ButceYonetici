import { Card, Button,Flex, Form, Input, Modal } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import ProfilePage from './ProfilePage';



const SignupForm = ({setSigningUp}) => {
    const [failedSignup, setFailedSignup] = useState(false);

    const onFinish = async (values) => {
        try{
        const signupResponse = await axios.post("http://localhost:5999/users", values);
        console.log(signupResponse);
        if(!signupResponse.data.success){
            setFailedSignup(true);
        }
        setSigningUp(false);
    }catch(error){
        setFailedSignup(true);
    }
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleModalClose = () => {
        setFailedSignup(false);
    };

   return <>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Card title="Signup Form" style={{ maxWidth: 1000, margin: 'auto' }}>
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
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
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
                    <Form.Item><Button type='text' onClick={()=>setSigningUp(false)}>Log In</Button></Form.Item>
                    </Flex>
                </Form>
                </Card>
                </div>
                <Modal open={failedSignup} onOk={handleModalClose} onCancel={handleModalClose} >
                    <div>Failed To Sign Up</div>
                </Modal>
    </>
}
export default SignupForm;