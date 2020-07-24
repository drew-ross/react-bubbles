import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const initialFormValues = {
  username: '',
  password: ''
};

const Login = () => {

  const [formValues, setFormValues] = useState(initialFormValues);
  const history = useHistory();

  const handleChanges = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/login', trimmedFormValues())
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        history.push('/bubbles');
    })
      .catch(err => console.log(err))
  };

  const trimmedFormValues = () => {
    return {
      username: formValues.username.trim(),
      password: formValues.password.trim()
    };
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <br />
        <input
          id='username'
          name='username'
          value={formValues.username}
          onChange={handleChanges}
        />
        <br />
        <label htmlFor='password'>Password</label>
        <br />
        <input
          id='password'
          name='password'
          type='password'
          value={formValues.password}
          onChange={handleChanges}
        />
        <br />
        <button type='submit'>Submit</button>
      </form>
    </>
  );
};

export default Login;
