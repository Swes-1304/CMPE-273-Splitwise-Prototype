import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';

import { useDispatch } from 'react-redux';
import { logoutAction } from '../../actions/index';

const landingPage = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    cookie.remove('cookie', { path: '/' });
    dispatch(logoutAction());
  };

  let navLogin = null;
  if (cookie.load('cookie')) {
    console.log('Able to read cookie');
    navLogin = (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Button variant="light">
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </Button>{' '}
        </li>
      </ul>
    );
  } else {
    // Else display login button
    console.log('Not Able to read cookie');
    navLogin = (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Button variant="light">
            <Link to="/login"> Login</Link>
          </Button>{' '}
        </li>
        <li>
          <Button variant="dark">
            <Link to="/signup">Sign-up</Link>
          </Button>
        </li>
      </ul>
    );
  }

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Splitwise</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav>{navLogin}</Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default landingPage;
