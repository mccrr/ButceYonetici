import { Card, Form, Input, Button, InputNumber, DatePicker, Select } from 'antd';
import axios from 'axios';

const ExpenseForm = ({setSelectedExpense, initialValues, username, updating, onCancel, setIsExpenseModalOpen, onDataChange}) => {
  const [form] = Form.useForm();
  form.setFieldsValue(initialValues)

  const handleSubmit = async (values) => {
    const reqBody = {...values, type: "expense", username};
    if(updating){
      await axios.put(`http://localhost:5999/expenses/${initialValues._id}`, reqBody);
    }else{
    await axios.post("http://localhost:5999/expenses/", reqBody);
    }
    setIsExpenseModalOpen(false);
    onDataChange();
    form.resetFields();
    setSelectedExpense(null);
  };

  const handleCancel = ()=>{
    setSelectedExpense(null);
    form.resetFields();
    onCancel();
  }


  return (
    <Card style={{ margin: 'auto', maxWidth: '400px' }}>
      <Form form={form} onFinish={handleSubmit} onCancel={handleCancel} layout='vertical'>
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
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="category"
          label="Category"
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
          name="paymentMethod"
          label="PaymentMethod"
        >
          <Select options={[{value:"Credit Card", label: "Credit Card"},{value:"Cash",label:"Cash"}]} />
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
