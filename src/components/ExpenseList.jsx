import { Button, Modal, Table } from "antd";
import { useState } from "react";
import ExpenseForm from "./ExpenseForm";

const ExpenseList = ({dataSource, setDataSource}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const columns = [
        {title: 'Amount', dataIndex: 'amount', key: 'amount'},
        {title: 'Title', dataIndex: 'title', key: 'title'},
        {title: 'Date', dataIndex: 'date', key: 'date'}
    ];

    const handleClick = () => {
        setIsModalOpen(true);
    };


    return <>
    <Table columns={columns} dataSource={dataSource} rowKey='title'></Table>
    <Button onClick={handleClick}>Add Expense</Button>
    <Modal open={isModalOpen} title='Add Expense' footer={null}>
        <ExpenseForm setIsModalOpen={setIsModalOpen} dataSource={dataSource} setDataSource={setDataSource}></ExpenseForm>
    </Modal>
    </>
};

export default ExpenseList;