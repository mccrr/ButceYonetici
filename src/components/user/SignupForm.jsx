import { Card, Button,Flex, Form, Input } from 'antd';

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const SignupForm = () => (
    <>
        {/* <div style={{ display: 'grid', placeItems: 'center', minHeight: '80vh' }}>
            <div style={{ fontSize: '3rem', borderStyle: "solid", borderRadius: '10%', display: 'flex', flexDirection: 'column', padding: '20px' }}>
                <p style={{ margin: 'auto', marginBottom: '35px' }}>Login</p> */}
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Card title="Signup Form" style={{ maxWidth: 600, margin: 'auto' }}>
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
                    <Form.Item><Button type='text'>Log In</Button></Form.Item>
                    </Flex>
                </Form>
                </Card>
                </div>
            {/* </div>
        </div> */}
    </>
);
export default SignupForm;