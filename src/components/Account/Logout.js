import React from 'react';
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