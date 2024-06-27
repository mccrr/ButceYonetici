import { useState } from "react";
import ItemList from "./components/ItemList";
import LoginForm from "./components/user/LoginForm";
import SignupForm from "./components/user/SignupForm";
import "./css/main.css";


const App = () => {
  const [username, setUsername] = useState('');
  const [signingUp, setSigningUp] = useState(false);
  const [user, setUser] = useState(false);

  return <>
    {(!username && !signingUp) && <LoginForm setUser={setUser} setSigningUp={setSigningUp} setUsername={setUsername} />}
    {(username && !signingUp) && <ItemList user={user} setUser={setUser} username={username} setUsername={setUsername}></ItemList>}
    {signingUp && <SignupForm setSigningUp={setSigningUp}></SignupForm>}
    </>
};

export default App;
