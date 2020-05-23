import React from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import './account.css';

const mongoose = require('mongoose');


export default class Register extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          fname: '',
          lname: '',
          email: '',
          password: '',
		  vpassword: undefined,
		  redirect: undefined
      }
	}
	
	componentDidMount() {
        this.setState({ fname: document.querySelector('input[name="fname"') })
        this.setState({ lname: document.querySelector('input[name="lname"') });
        this.setState({ email: document.querySelector('input[name="email"') });
        this.setState({ password: document.querySelector('input[name="password"') });
	}

    onChange = (e) => {
        var target = e.target;
        
        if ( target.name === 'fname' ){
            this.setState({ fname: target.value });
        } else if ( target.name === 'lname' ){
            this.setState({ lname: target.value});
        } else if ( target.name === 'email' ){
            this.setState({ email: target.value});
        } else if ( target.name === 'password' ){
            this.setState({ password: target.value});
        } else if ( target.name === 'vpassword' ){
            this.setState({ vpassword: target.value});
        }
	}
	
	onSubmit = (e) => {
		e.preventDefault();

		var newUser = {
			_id: mongoose.Types.ObjectId(),
			fname: this.state.fname,
          	lname: this.state.lname,
          	email: this.state.email,
          	passwordHash: this.state.password,
		};

		axios.post(`http://localhost:3000/user/create/${newUser._id}`, newUser ).then(
			res => console.log(res)
		)

		this.setState({ redirect: '/login' });
	}

	validateEmail = (mail) => {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
		{
			return (true)
		}
			return (false)
	}
  
    render () {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />
		}
        return (
            <div className="row account">
                <form className="account-form">
                    <h1 className="header">Register</h1>
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
                        <input onChange={this.onChange} type="text" name="email" className="form-control" />
                  	</div>
                  	<div className="form-group form-check">
                        <label htmlFor="Password">Password</label>
                        <input onChange={this.onChange} type="password" name="password" className="form-control" />
                  	</div>
					
                  	<div className="form-group form-check">
                        <label htmlFor="Verify Password">Verify Password</label>
                        <input onChange={this.onChange} type="password" name="vpassword" className="form-control" />
                  	</div>
					{
						<ul className="small">
							{
								! this.validateEmail(this.state.email) ?
								<li className="text-danger">Email should look like 'john@example.com'</li> :
								null
							}
							{
								! ( this.state.password == this.state.vpassword) ?
								<li className="text-danger">Passwords must match</li> :
								null
							}
							{
								this.state.password.length < 8 ?
								<li className="text-danger">Passwords must be atleast 8 characters.</li> :
								null
							}
						</ul>
						
					}
                	<div className="form-group form-check">
						{ 
							this.state.vpassword === this.state.password && this.validateEmail(this.state.email) && this.state.password.length >= 8 ? 
								<input onClick={ this.onSubmit } type="submit" className="btn btn-primary" value="Register"/> :
								<input type="submit" className="btn btn-primary" value="Register" disabled/>
						}
                	</div>
              	</form>
          	</div>
    	);
    }  
}