import React from 'react';
import { Calendar, Card } from 'antd';
import dayjs from 'dayjs';

const CalendarView = ({ data = [] }) => {
  const dateCellRender = (value) => {
    const listData = (data || []).map(item => ({
        ...item,
        date: dayjs(item.date) // Convert date to dayjs object
      })).filter(item => dayjs(item.date).isSame(value, 'day'));
    
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <div style={{ color: item.type === 'income' ? 'green' : 'red' }}>
              <strong>{item.type === 'income' ? '+' : '-'}{`${item.amount}$ (${item.title})`}</strong>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  const monthCellRender = (value) => {
    const monthData = (data || []).map(item => ({
        ...item,
        date: dayjs(item.date)
      })).filter(item => dayjs(item.date).isSame(value, 'month'));

    let income = 0;
    let expense = 0;
    for (let item of monthData) {
      if (item.type === 'income') {
        income += item.amount;
      } else {
        expense += item.amount;
      }
    }

    return (
      <div>
        {monthData.length > 0 && (
          <div>
            <strong style={{ color: 'green' }}>Total Income: {income}$</strong><br />
            <strong style={{ color: 'red' }}>Total Expenses: {expense}$</strong><br />
            <strong>Balance: <span style={{ color: income>=expense ? 'green' : 'red' }}>{income>=expense && '+'}{income-expense}$</span></strong>
          </div>
        )}
      </div>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return (
    <Card title="Income and Expense Calendar">
      <Calendar cellRender={cellRender} />
    </Card>
  );
};

export default CalendarView;
