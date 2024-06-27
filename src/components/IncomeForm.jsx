import { Card, Form, Input, Button, InputNumber, DatePicker, Select } from 'antd';
import axios from 'axios';

const IncomeForm = ({setSelectedIncome, initialValues, updating, onCancel, setIsIncomeModalOpen, onDataChange, username}) => {
  const [form] = Form.useForm();
  form.setFieldsValue(initialValues)

  const handleSubmit = async (values) => {
    const reqBody = {...values, type: "income", username};
    if(updating){
      await axios.put(`http://localhost:5999/income/${initialValues._id}`, reqBody);
    }else{
    await axios.post("http://localhost:5999/income/", reqBody);
    }
    setIsIncomeModalOpen(false);
    onDataChange();
    form.resetFields();
    setSelectedIncome(null);
  };

  const handleCancel = ()=>{
    console.log('handleCancel function');
    setSelectedIncome(null);
    setIsIncomeModalOpen(false);
    onCancel();
    form.resetFields();
  }


  return (
    <Card style={{ margin: 'auto', maxWidth: '400px' }}>
      <Form form={form} onFinish={handleSubmit} layout='vertical' onCancel={handleCancel}>
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
          name="source"
          label="Source"
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

export default IncomeForm;
