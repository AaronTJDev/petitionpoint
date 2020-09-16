import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from './Register';
import Logout from './Logout';
import Login from './Login';
import Edit from './Edit';

const mongoose = require('mongoose');


export default class Account extends React.Component {
    render () {
        return (
			<Switch>
                  <Route path="/login" component = { Login } />
                  <Route path="/register" component = { Register } />
                  <Route path="/logout" component = { Logout }/>
                  <Route path="/edit" component = { Edit }/>
			</Switch>
            
    	);
    }  
}