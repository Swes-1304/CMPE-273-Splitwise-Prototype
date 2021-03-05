import React from 'react';
import '../../App.css';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import landingPage from '../landingPage/LandingPage';

const dashboard = () => {
  const usernamestate = useSelector((state) => state.usernamered.username);
  console.log(usernamestate);

  if (!cookie.load('cookie')) {
    return <Redirect to="/" />;
  }
  return (
    <div className="container-fluid">
      <landingPage />
      <div>
        <Navbar.Collapse className="justify-content-end" />
        <Nav>Hey {usernamestate}!!</Nav>
        <ButtonGroup vertical>
          <Button variant="light">
            <Link to="/profile"> Your Profile </Link>
          </Button>

          <br />
          <p> Groups </p>
          <Button variant="light">
            <Link to="/createnewgroup"> + New Group </Link>
          </Button>
          <br />
          <p> Expenses </p>
          <br />
          <br />
          <br />
          <br />
          <p> Friends </p>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default dashboard;
