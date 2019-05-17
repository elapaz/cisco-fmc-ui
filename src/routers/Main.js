import React, { Component } from 'react';

import { Router, Route, Switch } from 'react-router-dom';

import HomeScreen from '../screens/HomeScreen';

import { history } from '../services/history';
import NotFound from '../screens/errorpages/NotFound';
import RulesScreen from "../screens/RulesScreen";
import AuditScreen from "../screens/AuditScreen";
import PrivateRoute from "./PrivateRoute";
import LoginScreen from "../screens/LoginScreen";
import LogoutScreen from "../screens/LogoutScreen";
import ObjectsScreen from "../screens/ObjectsScreen";

export default class Main extends Component {
  render() {
    return (
      <Router history={history} >
        <div>
          <Switch>
            <PrivateRoute exact path="/" component={HomeScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/logout" component={LogoutScreen} />

            <PrivateRoute path="/rules" component={RulesScreen} />
            <PrivateRoute path="/audit" component={AuditScreen} />
            <PrivateRoute path="/objects" component={ObjectsScreen} />

            <Route path="" component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
