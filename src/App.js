import classes from './App.module.css';
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate()

  const loginHandler = () => {
      return navigate("/login")
  }

  const registerHandler = () => {
    return navigate("/register")
}

  return (
    <div className={classes.actions}>
      <h1>Welcome to My Bank</h1>
      <button onClick={loginHandler}>Login to Your Account</button>
      <button onClick={registerHandler}>Register New Account</button>
    </div>
  );
}

export default App;
