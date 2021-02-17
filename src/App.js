import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Cookies from 'universal-cookie'

import history from "./history";
import Routesbasic from './Routesbasic';
import Routes from './Routes';
import 'bootstrap/dist/css/bootstrap.css';

import Amplify, { Auth } from 'aws-amplify';
import * as AWS from 'aws-sdk';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: 'us-east-1',
    userPoolId: 'us-east-1_LCd390gf0',
    identityPoolId: 'us-east-1:f66d43e9-0077-4089-b264-85995454693b',
    userPoolWebClientId: '38467q14qhco63rglc2jjhhsgk'
  }
});

AWS.config.region = 'us-east-1';

const cookies = new Cookies();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      serverURL: 'https://donkeycargo.xyz',
      isAuthenticated : false
    }
  }
  componentDidMount() {
    console.log(cookies.get('email'));
    Auth.currentAuthenticatedUser().then(() => {
      this.setState({
        isAuthenticated: true,
      });
    }, error => {
      this.setState({
        isAuthenticated: false,
      });
    });
  }

  render() {
    const { isAuthenticated } = this.state;
    
    return (
      <Router history={history}>
        {/* {cookies.get('email') ? <Routes /> : <Routesbasic />} */}
        {isAuthenticated ? <Routes /> : <Routesbasic />}
      </Router>
    );
  }
}

export default App;
