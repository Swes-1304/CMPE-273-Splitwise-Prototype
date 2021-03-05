import React, { useState } from 'react';
import '../../App.css';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import cookie from 'react-cookies';
// import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { Form, Input } from 'react-validation';
// import { isEmail } from 'validator';
import { signinAction } from '../../actions/index';

const saltRounds = 10;

// Define a Signup Component
const signup = () => {
  const [username, usrchangeHandler] = useState('');
  const [email, emailChangeHandler] = useState('');
  const [password, passwordChangeHandler] = useState('');
  const hist = useHistory();

  const usernamestate = useSelector((state) => state.usernamered);
  const dispatch = useDispatch();

  const required = (targetvalue) => {
    if (!targetvalue) {
      return (
        <div className="alert">
          <p style={{ color: 'maroon' }}>Field cannot be empty!</p>
        </div>
      );
    }
    return false;
  };

  const isEmailValid = (targetvalue) => {
    const emailpattern = /\S+@\S+\.\S+/;
    console.log(emailpattern.test(targetvalue));
    if (!emailpattern.test(targetvalue)) {
      return (
        <div className="alert">
          <p style={{ color: 'maroon' }}>Please enter a valid Email!</p>
        </div>
      );
    }
    return false;
  };

  const ispswdValid = (targetvalue) => {
    const pwdpattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,50}$/;
    if (!pwdpattern.test(targetvalue)) {
      return (
        <div className="alert">
          <p style={{ color: 'maroon' }}>
            Please enter a valid Password with one numeric, special character,
            lower and upper case letters !
          </p>
        </div>
      );
    }
    return false;
  };

  const submitsignup = async (e) => {
    // prevent page from refresh
    e.preventDefault();
    const data = {
      username,
      email,
      encryptpassword: await bcrypt.hash(password, saltRounds),
    };
    console.log(data);
    axios.defaults.withCredentials = true;
    axios
      .post('http://localhost:3001/signup', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(signinAction(username));
          console.log(usernamestate);
          hist.push('/dashboard');
        } else {
          console.log(response.data);
          alert(response.data);
        }
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.data);
      });
  };

  if (cookie.load('cookie')) {
    hist.push('/dashboard');
  }

  return (
    <form>
      <div>
        <div className="container">
          <div className="login-form">
            <div className="main-div">
              <div className="panel">
                <h2>Signup</h2>
                <p>Please enter your name , email and password</p>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  onChange={(e) => {
                    usrchangeHandler(e.target.value);
                    required(e.target.value);
                  }}
                  className="form-control"
                  name="username"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email "
                  onChange={(e) => {
                    emailChangeHandler(e.target.value);
                    required(e.target.value);
                    isEmailValid(e.target.value);
                  }}
                  className="form-control"
                  name="email"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  onChange={(e) => {
                    passwordChangeHandler(e.target.value);
                    required(e.target.value);
                    ispswdValid(e.target.value);
                  }}
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                type="button"
                onClick={submitsignup}
                className="btn btn-primary"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
// export Signup Component
export default signup;
