import { Timeline } from "antd"


const TimelineView = ({data}) => {
    console.log(data);
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    const items = data.map( (item)=>({
        label: <div style={{fontSize:'1.3rem'}}>{item.date.substring(0,10)}</div>,
        color: item.type==="income" ? 'green' : 'red',
        children: <div style={{fontSize:'1.3rem'}}>{item.type === 'income' ? '+' : '-'}{item.amount}$    {item.title}`</div>
    })
);
    return <>
    <Timeline mode='left' items={items} />
    </>
}

export default TimelineView;