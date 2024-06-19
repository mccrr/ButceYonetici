import { Card, Form, Input, Button, InputNumber, DatePicker, message } from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';

const ExpenseForm = ({ setIsModalOpen, dataSource, setDataSource }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    setDataSource([...dataSource, values]);
    setIsModalOpen(false);
    form.resetFields();
    console.log([...dataSource, values]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Card style={{ margin: 'auto', maxWidth: '400px' }}>
      <Form form={form} onFinish={handleSubmit} initialValues={{
          date: dayjs()
        }}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: 'Please input the amount!' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
        name="date"
        label="Date"
        rules={[{required: true, message: "Date is required"}]}
        ><DatePicker /></Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
            Submit
          </Button>
          <Button onClick={handleCancel} type="default">
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ExpenseForm;
