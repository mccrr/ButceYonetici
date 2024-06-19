import { useState } from "react";
import ExpenseList from "./components/ExpenseList";
import IncomeForm from "./components/ExpenseForm";
import LoginForm from "./components/user/Loginform";
import SignupForm from "./components/user/SignupForm";


const App = () => {
const [dataSource, setDataSource] = useState([
  {
    key: 1,
    amount: 100,
    title: 'Ice cream',
    date: new Date(26,6,24)
  },
  {
    key: 2,
    amount: 850,
    title: 'Laptop',
    date: new Date(17,4,24)
  },
]);

  return <>
    <ExpenseList dataSource={dataSource} setDataSource={setDataSource}></ExpenseList>
    </>
};

export default App;
