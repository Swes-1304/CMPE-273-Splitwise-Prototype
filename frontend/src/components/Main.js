import React, { Component } from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import login from './login/Login';
import signup from './signup/Signup';
import landingPage from './landingPage/LandingPage';
import dashboard from './dashboard/dashboard';
import createnewgroup from './create_new_group/create_new_group';
// Create a Main Component
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Router>
          <Route path="/" component={landingPage} />
          <Route path="/signup" component={signup} />
          <Route path="/login" component={login} />
          <Route path="/dashboard" component={dashboard} />
          <Route path="/createnewgroup" component={createnewgroup} />
        </Router>
      </div>
    );
  }
}
// Export The Main Component
export default Main;
