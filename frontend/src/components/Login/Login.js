import React, { useState } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginAction } from '../../actions/index';

const login = () => {
  const [email, emailChangeHandler] = useState('');
  const [password, passwordChangeHandler] = useState('');
  const hist = useHistory();

  const usernamestate = useSelector((state) => state.usernamered); // checking the state value
  const dispatch = useDispatch();

  const submitLogin = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    axios.defaults.withCredentials = true;
    axios
      .post('http://localhost:3001/login', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        console.log('response :', response.data);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(loginAction(response.data)); // dispatch the action
          console.log(usernamestate);
          hist.push('/dashboard');
        } else {
          console.log(response.data);
          alert(response.data);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data);
      });
  };

  if (cookie.load('cookie')) {
    hist.push('/dashboard');
  }

  return (
    <div>
      <div className="container">
        <div className="login-form">
          <div className="main-div">
            <div className="panel">
              <h2>Login</h2>
              <p>Please enter your email address and password</p>
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="email"
                placeholder="Email"
                onChange={(e) => {
                  emailChangeHandler(e.target.value);
                }}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                onChange={(e) => {
                  passwordChangeHandler(e.target.value);
                }}
                required
                formNoValidate
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={submitLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
// export Login Component
export default login;
