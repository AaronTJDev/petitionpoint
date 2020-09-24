import React from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { userContext } from '../../userContext';

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: undefined,
            failedLogin: null
        }
    }
    
    onChange = (e) => {
        var target = e.target;
        
        if (target.name === 'email')
        {
            this.setState({ email: target.value});
        } 
        else if (target.name === 'password')
        {
            this.setState({ password: target.value});
        }
	}

    handleClick = (e) => {
        // Prevent navigation to axios post.
        e.preventDefault();

        // Get user info from state
        const userInfo = {
            email: this.state.email,
            passwordHash: this.state.password
        };
        
        // Send post request to login route using userInfo
        axios.post(`http://localhost:3000/user/authenticate`, userInfo )
            .then( res => {
                if ( res.status === 200 ){
                    // Update user object within state in App.js 
                    this.context.loginUser(res.data);
                    // Redirect to home
                    this.setState({ redirect: '/' });
                }
            }).catch( err => {
                this.setState({ failedLogin: <p className="text-danger ml-4" id="password-warning-length">Username or password provided was incorrect.</p> })
                console.log(err);
            });
	}
  
    render () {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />
        }
        
        return (
            <div className="row account">
                <form className="account-form mt-5">
                    <h1 className="header">Login</h1>
                    <div className="form-group form-check">
                        <label htmlFor="Email">Email</label>
                        <input onChange={this.onChange}  type="text" className="form-control" name="email"  size="254"/>
                    </div>
                    <div className="form-group form-check">
                        <label htmlFor="Password">Password</label>
                        <input onChange={this.onChange}  type="password" className="form-control" name="password" />
                    </div>
                    <div className="form-group form-check">
                        <input onClick={ this.handleClick } type="submit" className="btn btn-primary" value="Login"/>
                    </div>
                    {
                        this.state.failedLogin ? 
                            this.state.failedLogin:
                            null
                    }
                </form>
                <div id="login-img" className="illustration px-md-3 px-lg-5"></div>
            </div>
        );
    }  
}
Login.contextType = userContext;