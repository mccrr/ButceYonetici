import { Card, Flex } from "antd";

const BudgetDisplay = ({data}) => {
    let income = 0;
    let expenses = 0;
    for(let item of data){
        if(item.type==='income'){
            income+=item.amount;
        }
        else{
            expenses+=item.amount;
        }
    }
    const budget = income-expenses;
    return <>
    <Flex style={{margin: '10px'}} justify="center" horizontal>
    <Card style={{background:'green', color:'white', fontSize:'1.3rem', borderRadius: '50%', margin:'5px'}}>+{income}$</Card>
    <Card style={{background:'lightgrey', color: budget >=0 ? 'green' : 'red', fontSize:'1.3rem', margin:'5px', textDecoration:'bold'}}>Budget: {budget}$</Card>
    <Card style={{background:'red', color:'white', fontSize:'1.3rem', margin:'5px', borderRadius: '50%'}}>-{expenses}$</Card>
    </Flex>
    </>
}

export default BudgetDisplay;