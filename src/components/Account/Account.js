import React from 'react';
import { Route } from 'react-router-dom';
import Register from './Register';
import Logout from './Logout';
import Login from './Login';
import EditUser from './EditUser';

function Account () {
    return (
		<div>
            <Route path="/login" component = { Login } />
            <Route path="/register" component = { Register } />
            <Route path="/logout" component = { Logout }/>
            <Route path="/edit" component = { EditUser }/>
		</div>
        
    );
}

export default Account;