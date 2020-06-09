import React from 'react';
import axios from 'axios';
import './account.css';
import { Redirect } from "react-router-dom";
import { userContext } from '../../userContext';

export default class Logout extends React.Component {
    componentDidMount(){
        this.context.logoutUser();
    }

    render () {
		return <Redirect to="/" />
    }  
}
Logout.contextType = userContext;