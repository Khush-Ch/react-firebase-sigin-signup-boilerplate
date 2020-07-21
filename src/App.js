import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Navbar from './components/Navbar';
import { AuthProvider } from './components/Auth/Auth';
import PrivateRoute from "./components/Auth/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <PrivateRoute path="/" exact component={Home}/>
          <Route path="/signin" component={Signin}/>
          <Route path="/signup" component={Signup}/>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
