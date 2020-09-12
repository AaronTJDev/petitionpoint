import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import './account.css';
import { Redirect } from "react-router-dom";
import { userContext } from '../../userContext';

export default class Edit extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          fname: '',
          lname: '',
          redirect: undefined,
          successMessage: ''
      }
    }

    componentDidMount (){
        this.setState({ fname: this.context.user.fname, lname: this.context.user.lname });
    }
    
    onChange = (e) => {
        var target = e.target;
        
        if ( target.name === 'fname' ){
            this.setState({ fname: target.value});
        } else if ( target.name === 'lname' ){
            this.setState({ lname: target.value});
        }
	}

    handleClick = (e) => {
        // Prevent navigation to axios post.
        e.preventDefault();

        // Get user id from context
        const userId = this.context.user._id;

        // Get updated user info from state
        let user = {
            fname: this.state.fname,
            lname: this.state.lname
        }
        
        // Send post request to edit route using user
        axios.put(`http://localhost:3000/user/edit/${userId}`, user )
            .then( res => {
                if ( res.status === 200 ){
                    this.setState({ successMessage : res.data });
                    this.context.user.fname = res.data.fname;
                    this.context.user.lname = res.data.lname;
                    this.toggleInputs();
                }
            }).catch( err => {
                console.log(err);
            });
    }
    
    
    toggleInputs = () => {
        // Seleect all form inputs and toggle them
        $('.form-control').each(function(input){
            $(this).attr('disabled', !$(this).attr('disabled') );
            $(this).removeAttr('value' );
        });
        
        // Select submit button and toggle it
        if ( $('input[type="submit"]').css('display') == 'inline-block' ) {
            $('input[type="submit"]').css('display', 'none');
        } else {
            $('input[type="submit"]').css('display', 'inline-block');
        }
    }
  
    render () {
        // Redirect to home
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />
        }
        
        return (
            <userContext.Consumer>
                { context => (
                    <div className="row account">
                        <form className="account-form">
                            <h1 className="header">Account Information</h1>
                                <button type="button" className="col-3 mx-4 mb-3 btn btn-outline-dark btn-sm" onClick={this.toggleInputs}>Edit</button>
                                <div className="form-group form-check">
                                    <label htmlFor="First Name">First Name</label>
                                    <input onChange={this.onChange} value={this.state.fname} type="text" name="fname" className="form-control" disabled />
                                </div>
                                <div className="form-group form-check">
                                    <label htmlFor="Last Name">Last Name</label>
                                    <input onChange={this.onChange} value={this.state.lname} type="text" name="lname" className="form-control" disabled />
                                </div>
                                <div className="form-group form-check">
                                    <input onClick={ this.handleClick } style={{display:'none'}} type="submit" className="btn btn-primary" value="Submit"/>
                                </div>
                        </form>
                    </div>
                )}
            </userContext.Consumer>
        );
    }  
}
Edit.contextType = userContext;