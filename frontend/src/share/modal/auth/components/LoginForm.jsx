import { Box, Link, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Axios from '../../../AxiosInstance';
import { AxiosError } from 'axios';

const LoginForm = ({ handleClose = () => {}, setIsLogin = () => {}, setStatus = () => {}, setUser = () => {} }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [usernameOrEmailError, setUsernameOrEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async () => {
    // TODO: Implement login
    // 1. validate form
    if(!validateFrom()) return;
    // 4. if fail, show error message, and reset text fields value
    try{
    // 2. call API to login
    const response = await Axios.post('/login', {
    usernameOrEmail,
    password,
    });
    // 3. if success, close modal, and update user information.
    if(response.data.success){
    setUser({
    username: response.data.data.username,
    email: response.data.data.email,
    });
    handleClose();
    setStatus({
    msg: response.data.msg,
    severity: 'success'
  });
  }
    }catch (e){
      setUsernameOrEmail('');
      setPassword('');
      //check if e are AxiosError
      if(e instanceof AxiosError){
        //check if e.response exist
        if(e.response){
          return setStatus({
            msg: e.response.data.error,
            severity: 'error',
          });
        }
        return setStatus({
          msg: e.message,
          severity: 'error',
        });
      }
    }
  };

  const validateFrom = () => {
    let isValid = true;
    if(!usernameOrEmail) {
      setUsernameOrEmailError('Username or email is required');
      isValid = false;
    }
    if(!password){
      setPasswordError('Password is required');
      isValid = false;
    }
    return isValid;
  }; 

  return (
    <Box
      sx={{
        width: '45%',
        height: '80vh',
        background: 'linear-gradient(yellow,5%,white,pink)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        p: 8,
      }}
    >
      <Typography fontSize="1.25rem" fontWeight="bold" color="blueviolet">
        Login Now To Create Note!
      </Typography>
      <Typography fontSize="2.5rem" fontWeight="700" color="GrayText">
        Login
      </Typography>
      <TextField
        value={usernameOrEmail}
        onChange={(e) => setUsernameOrEmail(e.target.value)}
        fullWidth
        error={usernameOrEmailError !== ''}
        helperText={usernameOrEmailError}
        label="Username or Email"
        placeholder="Type your username or email"
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        error={passwordError !== ''}
        helperText={passwordError}
        label="Password"
        type="password"
        placeholder="Type your password"
      />
      <Link color="#999999" sx={{ alignSelf: 'end', cursor: 'pointer' }} onClick={() => setIsLogin(false)}>
        Don't have an account? Register NOW!
      </Link>
      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: '1.25rem',
          fontSize: '1.5rem',
          borderRadius: '8px',
          border: 'none',
          background: 'blue',
          backgroundSize: '200% 100%',
          backgroundPosition: '100% 0%',
          transition: 'all .2s ease-in-out',
        }}
        onMouseOver={(e) => {
          e.target.style.color = 'tomato';
          e.target.style.backgroundPosition = '0% 0%';
        }}
        onMouseLeave={(e) => {
          e.target.style.color = 'white';
          e.target.style.backgroundPosition = '100% 0%';
        }}
      >
        Login
      </button>
    </Box>
  );
};

export default LoginForm;
