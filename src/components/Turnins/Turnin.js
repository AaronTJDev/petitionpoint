import React from 'react';
import axios from 'axios';
import { userContext } from '../../userContext';
import { Switch, Route, Link } from 'react-router-dom';

export default class Turnin extends React.Component {
    render(){
        return (
            <div className="row">
                <h1>Turn-ins</h1>
                <Link to="petition/new/" className="fa fa-plus"></Link>
                <Switch>
                </Switch>
            </div>
        )
    }
}
Turnin.contextType = userContext;
 
/* 

*/