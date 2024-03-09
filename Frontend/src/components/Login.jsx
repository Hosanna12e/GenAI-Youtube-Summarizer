import { useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";
import Alert from '@mui/material/Alert';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginErrorAlert, setShowLoginErrorAlert] = useState(false);

  const handleLogin = () => {
    fetch('http:// 192.168.111.31:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
    })
    .then(response => response.json())
    .then(data => {
      if(data.message === "Success"){
        sessionStorage.setItem('username', username);
          navigate("/Chat")
      } 
      else {
        setShowLoginErrorAlert(true);
        setTimeout(() => {
          setShowLoginErrorAlert(false);
        }, 1000);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  const isLoginDisabled = !username || !password;

  return (
    <div>
      <>
        <div className="login-container">
          <TextField label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)} />
          <br /><br />
          <TextField label="Password" variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)} />
          <br /><br />
          <Button variant="outlined" onClick={handleLogin} disabled={isLoginDisabled}>Login</Button> <br /> <br />
        </div>
      </>

      <div className="login-failure-alert-message">
        {showLoginErrorAlert && (
          <Alert severity="error">
            Invalid Username or Password
          </Alert>
        )}
      </div>
      
    </div>
  );
}

export default Login;