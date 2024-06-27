import { Card, Form, Input, Button, DatePicker, Image, InputNumber, Modal } from "antd";
import axios from "axios";
import moment from "moment";
import { useState } from "react";

const ProfilePage = ({ user, setUser, data, setData }) => {

  const [showUpdated, setShowUpdated] = useState(false);
  const [form] = Form.useForm();
  const initialValues = { ...user, birthday: moment(user.birthday) }
  form.setFieldsValue(initialValues);

  const onFinish = async (values) => {
    try {
      const response = await axios.put("http://localhost:5999/users", values);
      if (response.data.success) {
        console.log(response.data);
        setUser(response.data.data);
        setShowUpdated(true);
        setData({ ...data, profilePic: values.profilePic });
      }
    } catch (error) {
      console.log("Update Failed");
    }
  }

  return (
    <>
      <Card title="Profile Page" style={{alignContent:'center',justifyContent:'center', maxWidth: '600px', margin: 'auto', marginTop: '20px' }}>
        <Image
          preview={false}
          height='250px'
          width='250px'
          src={user.profilePic}
          style={{ borderRadius: '50%', marginLeft:'150px' }}
        />
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password disabled />
          </Form.Item>

          <Form.Item
            label="ProfilePic"
            name="profilePic"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Birthday"
            name="birthday"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Card>
      <Modal open={showUpdated} onCancel={() => setShowUpdated(false)} onOk={() => setShowUpdated(false)} onClose={() => setShowUpdated(false)}>
        <h2>Profile Updated</h2>
      </Modal>
    </>
  );
};

export default ProfilePage;
