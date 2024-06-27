import { Button, Modal, Table, Image, Layout, Menu, Row, Col, Input, Space, DatePicker } from "antd";
import { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import IncomeForm from "./IncomeForm";
import axios from "axios";
import moment from 'moment';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import CalendarView from "./CalendarView";
import TimelineView from "./TimelineView";
import BudgetDisplay from "./BudgetDisplay";
import ProfilePage from "./user/ProfilePage";
import { SearchOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { RangePicker } = DatePicker;

const ItemList = ({ user, setUser, username, setUsername }) => {
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
    const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [dataChanged, setDataChanged] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [selectedIncome, setSelectedIncome] = useState(null);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showTimeline, setShowTimeline] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [dateRange, setDateRange] = useState([null, null]);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };

    const handleDateFilter = (dates, confirm) => {
        confirm();
        setDateRange(dates);
    };

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        render: text => (searchedColumn === dataIndex ? <span>{text}</span> : text),
    });

    const columns = [
        { 
            title: 'Title', 
            dataIndex: 'title', 
            key: 'title', 
            width: '22%', 
            ...getColumnSearchProps('title'),
            sorter: (a, b) => a.title.localeCompare(b.title) 
        },
        {
            title: 'Amount', 
            dataIndex: 'amount', 
            key: 'amount', 
            width: '22%', 
            render: (amount, record) => (
                <span style={{ color: record.type === "income" ? 'green' : 'red', fontSize: '1.8rem' }}>
                    {record.type === "income" ? '+' : '-'}{amount}$
                </span>
            )
        },
        {
            title: 'Date', 
            dataIndex: 'date', 
            key: 'date', 
            width: '22%', 
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <RangePicker
                        value={selectedKeys[0]}
                        onChange={dates => setSelectedKeys(dates ? [dates] : [])}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleDateFilter(selectedKeys[0], confirm)}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                setSelectedKeys([]);
                                clearFilters();
                            }}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
            onFilter: (value, record) =>
                record.date
                    ? moment(record.date).isBetween(value[0], value[1], 'days', '[]')
                    : false,
            sorter: (a, b) => new Date(a.date) - new Date(b.date),
            render: date => <span>{new Date(date).toLocaleDateString()}</span>,
        },
        {
            title: 'Actions', 
            dataIndex: 'actions', 
            width: '34%', 
            render: (text, record) => (
                <div>
                    <Button type="primary" style={{ marginRight: '10px' }} onClick={record.type === "expense" ?
                        () => handleExpEdit(record) : () => handleIncEdit(record)}>Update</Button>
                    <Button danger style={{ marginRight: '10px' }} onClick={() => showDeleteModal(record)}>Delete</Button>
                </div>
            ),
        }
    ];

    const showDeleteModal = (record) => {
        setRecordToDelete(record);
        setIsDeleteModalVisible(true);
    };

    const handleDelete = async () => {
        if (recordToDelete) {
            const { _id, type } = recordToDelete;
            try {
                if (type === 'expense') {
                    await axios.delete(`http://localhost:5999/expenses/${_id}`);
                } else if (type === 'income') {
                    await axios.delete(`http://localhost:5999/income/${_id}`);
                }
                handleDataChange();
                setIsDeleteModalVisible(false);
            } catch (error) {
                console.error('Error deleting record:', error);
            }
        }
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
        setRecordToDelete(null);
    };

    const handleClick = () => {
        setIsExpenseModalOpen(true);
    };

    const handleIncomeClick = () => {
        setIsIncomeModalOpen(true);
    };

    const handleExpModalClose = () => {
        setIsExpenseModalOpen(false);
        setSelectedExpense(null);
    };

    const handleIncModalClose = () => {
        setIsIncomeModalOpen(false);
        setSelectedIncome(null);
    };

    const handleExpEdit = (record) => {
        var { date } = record;
        date = moment(date);
        const newRecord = { ...record, date };
        setSelectedExpense(newRecord);
        setIsExpenseModalOpen(true);
    };

    const handleIncEdit = (record) => {
        var { date } = record;
        date = moment(date);
        const newRecord = { ...record, date };
        setSelectedIncome(newRecord);
        setIsIncomeModalOpen(true);
    };

    const getAllData = async () => {
        const expResponse = await axios.get(`http://localhost:5999/expenses/all/${username}`);
        const incResponse = await axios.get(`http://localhost:5999/income/all/${username}`);

        const expensesData = expResponse.data.data;
        const incomeData = incResponse.data.data;

        var tableData = [...expensesData, ...incomeData];
        setData(tableData);
    };

    const handleDataChange = () => {
        setDataChanged(true);
    };

    useEffect(() => {
        getAllData();
        setDataChanged(false);
    }, [dataChanged]);

    const handleLogout = () => {
        setUsername(null);
    };

    const handleSendEmail = () => {
        setShowReport(true);
    };

    const handleProfile = () => {
        clearAll();
        setShowProfile(true);
    };

    const clearAll = () => {
        setShowCalendar(false);
        setShowTimeline(false);
        setShowProfile(false);
    };

    const handleCloseReport = () => {
        setShowReport(false);
    };

    return (
        <Layout>
            <Header>
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button
                            style={{ width: '50px', height: '50px', borderRadius: '50%', padding: '0px', border: 'none' }}
                            onClick={handleProfile}
                        >
                            <Image
                                preview={false}
                                height='50px'
                                width='50px'
                                src={user.profilePic}
                                style={{ borderRadius: '50%' }}
                            />
                        </Button>
                            <Button style={{marginLeft:'15px', height:'60px',color:'white', backgroundColor:'#091526', border:'none'}}
                                onClick={handleLogout}
                            >
                                Log Out
                            </Button>
                    </Col>
                    <Col>
                        <Menu mode="horizontal" theme="dark">
                            <Menu.Item
                                key="table"
                                onClick={clearAll}
                                className={(!showCalendar && !showTimeline && !showProfile) ? 'menu-item-button menu-item-active' : 'menu-item-button'}
                            >
                                Table View
                            </Menu.Item>
                            <Menu.Item
                                key="calendar"
                                onClick={() => {
                                    clearAll();
                                    setShowCalendar(true);
                                }}
                                className={showCalendar ? 'menu-item-button menu-item-active' : 'menu-item-button'}
                            >
                                Calendar
                            </Menu.Item>
                            <Menu.Item
                                key="timeline"
                                onClick={() => {
                                    clearAll();
                                    setShowTimeline(true);
                                }}
                                className={showTimeline ? 'menu-item-button menu-item-active' : 'menu-item-button'}
                            >
                                Timeline
                            </Menu.Item>
                            <Menu.Item
                                key="report"
                                onClick={handleSendEmail}
                                className="menu-item-button"
                            >
                                Get Report
                            </Menu.Item>
                            <Modal
                                title={selectedExpense ? 'Updating Expense' : 'Add Expense'}
                                open={isExpenseModalOpen}
                                onCancel={handleExpModalClose}
                                footer={null}
                            >
                                <ExpenseForm
                                    initialValues={selectedExpense}
                                    setSelectedExpense={setSelectedExpense}
                                    username={username}
                                    onCancel={handleExpModalClose}
                                    updating={selectedExpense ? true : false}
                                    setIsExpenseModalOpen={setIsExpenseModalOpen}
                                    onDataChange={handleDataChange}
                                />
                            </Modal>
                            <Modal
                                title={selectedIncome ? 'Updating Income' : 'Add Income'}
                                open={isIncomeModalOpen}
                                onCancel={handleIncModalClose}
                                footer={null}
                            >
                                <IncomeForm
                                    initialValues={selectedIncome}
                                    setSelectedIncome={setSelectedIncome}
                                    username={username}
                                    onCancel={handleIncModalClose}
                                    updating={selectedIncome ? true : false}
                                    setIsIncomeModalOpen={setIsIncomeModalOpen}
                                    onDataChange={handleDataChange}
                                />
                            </Modal>
                        </Menu>
                    </Col>
                </Row>
            </Header>
            <div style={{ padding: '24px' }}>
                {showProfile && <ProfilePage data={data} setData={setData} user={user} setUser={setUser}></ProfilePage>}
                {(!showCalendar && !showTimeline && !showProfile) && <>
                    <BudgetDisplay data={data} />
                    <Button style={{ background: 'red', marginRight: '13px' }} type="primary" onClick={handleClick}>Add Expense</Button>
                    <Button style={{ background: 'green', marginBottom: '20px' }} type="primary" onClick={handleIncomeClick}>Add Income</Button>
                    <Table columns={columns} dataSource={data} rowKey='_id'></Table>
                </>
                }
                {(showTimeline && !showProfile) && <div style={{ margin: '100px', fontSize: '2rem' }}><TimelineView style={{ margin: '100px', fontSize: '2rem' }} data={data} /></div>}
                {(showCalendar && !showProfile) && <div style={{ width: '80%', margin: 'auto' }}><CalendarView width='50px' data={data}></CalendarView></div>}
                <Modal title={`Report has been sent to ${user.email}`} open={showReport} onOk={handleCloseReport} onCancel={handleCloseReport}>
                    {(!showCalendar && !showTimeline && !showProfile) && <>
                        <BudgetDisplay data={data} />
                        <Table columns={columns} dataSource={data} rowKey='_id'></Table>
                    </>
                    }
                    {(showTimeline && !showProfile) && <>
                        <div style={{ marginBottom: '50px' }}></div><TimelineView data={data} /></>}
                    {(showCalendar && !showProfile) && <CalendarView data={data}></CalendarView>}
                </Modal>
                <DeleteConfirmationModal
                    open={isDeleteModalVisible}
                    onConfirm={handleDelete}
                    onCancel={handleCancelDelete}
                />
            </div>
        </Layout>
    );
};

export default ItemList;
