import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleRegister = () => {
    fetch('http:// 192.168.111.31:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Name: name, username: username, password: password }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === "Success") {
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
          navigate("/login");
        }, 1000);
      } else {
        setShowErrorAlert(true);
        setTimeout(() => {
          setShowErrorAlert(false);
        }, 1000);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  };

  const isRegisterDisabled = !name || !username || !password;

  return <div>
    <>
      <div className="register-container">
        <TextField label="Name" variant="outlined" onChange={(e) => setName(e.target.value)} />
        <br /><br />
        <TextField label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)} />
        <br /><br />
        <TextField label="Password" type="password" variant="outlined" onChange={(e) => setPassword(e.target.value)} />
        <br /><br />
        <Button onClick={handleRegister} variant="outlined" disabled={isRegisterDisabled}>
          Register
        </Button> <br /> <br />
        </div>
    </>

      <div className="register-success-alert-message">
        {showSuccessAlert && (
          <Alert severity="success">
            Account Created Successfully 🥳🥳
          </Alert>
        )}
      </div>

      <div className="register-failure-alert-message">
        {showErrorAlert && (
          <Alert severity="error">
            User already exists. Please choose a different username.
          </Alert>
        )}
      </div>
      
  </div>
}

export default Register;