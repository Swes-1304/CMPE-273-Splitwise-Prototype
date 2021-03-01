import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

const saltRounds = 10;

// Define a Signup Component
class signup extends Component {
  // call the constructor method
  constructor(props) {
    // Call the constrictor of Super class i.e The Component
    super(props);
    // maintain the state required for this component
    this.state = {
      username: '',
      email: '',
      password: '',
      usernameerrors: '',
      emailerrors: '',
      passworderrors: '',
      redirecttohome: null,
    };

    // Bind the handlers to this class
    this.usrchangeHandler = this.usrchangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitsignup = this.submitsignup.bind(this);
  }

  usrchangeHandler = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  isformvalid = () => {
    let formisvalid = true;
    const signuperrors = {
      usernameerrors: '',
      emailerrors: '',
      passworderrors: '',
    };

    const emailpattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,4})$/;
    const pwdpattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,50}$/;

    const { username, email, password } = this.state;

    if (username.length === 0) {
      formisvalid = false;
      signuperrors.usernameerrors = 'Username is required!';
      console.log(signuperrors.usernameerrors);
    }

    if (!emailpattern.test(email)) {
      formisvalid = false;
      signuperrors.emailerrors = 'Email ID is not Valid!';
      console.log(signuperrors.emailerrors);
    }
    if (!pwdpattern.test(password)) {
      formisvalid = false;
      signuperrors.passworderrors =
        'Password is not Valid and must contain at least 8 characters with a numeric, special character , lower and upper case letters!';
      console.log(signuperrors.passworderrors);
    }
    this.setState((prevstate) => ({
      ...prevstate,
      ...signuperrors,
    }));

    console.log(
      formisvalid,
      signuperrors.usernameerrors,
      signuperrors.emailerrors,
      signuperrors.passworderrors
    );
    return formisvalid;
  };

  // submit Login handler to send a request to the node backend
  submitsignup = async (e) => {
    // prevent page from refresh
    e.preventDefault();
    const formisvalidated = this.isformvalid();
    console.log(formisvalidated);
    if (formisvalidated) {
      const { username, email, password } = this.state;
      const data = {
        username,
        email,
        encryptpassword: await bcrypt.hash(password, saltRounds),
      };
      console.log(data);
      // set the with credentials to true
      axios.defaults.withCredentials = true;
      // make a post request with the user data
      axios
        .post('http://localhost:3001/signup', data)
        .then((response) => {
          console.log('Status Code : ', response.status);
          if (response.status === 200) {
            console.log(response.data);
            const redirectVar1 = <Redirect to="/dashboard" />;
            this.setState({ redirecttohome: redirectVar1 });
          } else {
            this.setState({
              redirecttohome: null,
            });
          }
        })
        .catch((err) => {
          console.log(err.response);
          alert(err.response.data);
          this.setState({
            errorMessage: err.response.data,
          });
        });
    }
  };

  render() {
    let redirectVar = null;
    if (cookie.load('cookie')) {
      redirectVar = <Redirect to="/dashboard" />;
    }
    const { usernameerrors, emailerrors, passworderrors } = this.state;
    const { redirecttohome } = this.state;
    return (
      <form>
        <div>
          <div className="container">
            {redirectVar}
            {redirecttohome}
            <div className="login-form">
              <div className="main-div">
                <div className="panel">
                  <h2>Signup</h2>
                  <p>Please enter your name , email and password</p>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    onChange={this.usrchangeHandler}
                    className="form-control"
                    name="username"
                    placeholder="Username"
                    required
                    formNoValidate
                  />
                  {usernameerrors && (
                    <span className="errmsg" style={{ color: 'maroon' }}>
                      {' '}
                      {usernameerrors}{' '}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    onChange={this.emailChangeHandler}
                    className="form-control"
                    name="email"
                    placeholder="Email Address"
                    required
                    formNoValidate
                  />
                  {emailerrors && (
                    <span className="errmsg" style={{ color: 'maroon' }}>
                      {' '}
                      {emailerrors}{' '}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    onChange={this.passwordChangeHandler}
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    required
                    formNoValidate
                  />
                  {passworderrors && (
                    <span className="errmsg" style={{ color: 'maroon' }}>
                      {' '}
                      {passworderrors}{' '}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={this.submitsignup}
                  className="btn btn-primary"
                  formNoValidate
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
// export Signup Component
export default signup;
