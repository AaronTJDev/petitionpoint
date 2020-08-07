import React from 'react';
import axios from 'axios';
import './account.css';
import { Redirect } from "react-router-dom";
import { userContext } from '../../userContext';

export default class Edit extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          email: '',
          password: '',
          redirect: undefined
      }
    }
    
    onChange = (e) => {
        var target = e.target;
        
        if ( target.name === 'email' ){
            this.setState({ email: target.value});
        } else if ( target.name === 'password' ){
            this.setState({ password: target.value});
        } else if ( target.name === 'fname' ){
            this.setState({ fname: target.value});
        } else if ( target.name === 'lname' ){
            this.setState({ lname: target.value});
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
        axios.post(`http://localhost:3000/user/login/u`, userInfo )
            .then( res => {
                console.log(res.data);
                if ( res.status === 200 ){
                    // Update user object within state in App.js 
                    this.context.loginUser(res.data);
                    // Redirect to home
                    this.setState({ redirect: '/' });
                }
            }).catch( err => {
                console.log(err);
            });
	}
  
    render () {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />
        }
        
        return (
            <div className="row account">
                <form className="account-form">
                    <h1 className="header">Edit</h1>
                    <div className="form-group form-check">
                        <label htmlFor="First Name">First Name</label>
                        <input onChange={this.onChange} type="text" name="fname" className="form-control" />
                    </div>
                    <div className="form-group form-check">
                        <label htmlFor="Last Name">Last Name</label>
                        <input onChange={this.onChange} type="text" name="lname" className="form-control" />
                    </div>
                    <div className="form-group form-check">
                        <label htmlFor="Email">Email</label>
                        <input onChange={this.onChange}  type="text" className="form-control" name="email" />
                    </div>
                    <div className="form-group form-check">
                        <label htmlFor="Password">Password</label>
                        <input onChange={this.onChange}  type="password" className="form-control" name="password" />
                    </div>
                    <div className="form-group form-check">
                        <input onClick={ this.handleClick } type="submit" className="btn btn-primary" value="Edit"/>
                    </div>
                </form>
            </div>
        );
    }  
}
Edit.contextType = userContext;