import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import './account.css';
import { Redirect } from "react-router-dom";
import { userContext } from '../../userContext';

export default class EditUser extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          fname: '',
          lname: '',
          redirect: undefined,
          successMessage: ''
      }
    }

    componentDidMount(){
        $('input[name="fname"]').val(this.context.user.fname)
        $('input[name="lname"]').val(this.context.user.lname)
    }

    componentDidUpdate(){
        $('input[name="fname"]').val(this.context.user.fname)
        $('input[name="lname"]').val(this.context.user.lname)
    }
    
    toggleInputs = () => {
        toggleFormInputs();
        toggleDeactivateButton();
        toggleSubmitButton();        
    }

    onChange = (e) => {
        var target = e.target;
        
        if ( target.name === 'fname' ){
            this.setState({ fname: target.value});
        } else if ( target.name === 'lname' ){
            this.setState({ lname: target.value});
        }
	}

    handleEdit = (e) => {
        // Prevent navigation to axios post.
        e.preventDefault();
    
        // Get user id from context
        const userId = this.context.user._id;
    
        // Get updated user info from state
        let user = {
            fname: this.state.fname,
            lname: this.state.lname
        }
        
        // Send PUT request to edit route using updated user
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
    
    deactivateAccount = (e) => {
        // Prevent navigation to axios post.
        e.preventDefault();

        var deactivationResponse = window.confirm("Are you sure you would like to deactivate your account?");
        
        // Get user id from context
        const userId = this.context.user._id;
        
        // Send PUT request to deactivate route
        if( deactivationResponse ){
            axios.put(`http://localhost:3000/user/deactivate/${userId}` )
            .then( res => {
                if ( res.status === 200 ){
                    this.setState({ successMessage : res.data });
                    this.context.user.status = res.data.status;
                        this.toggleInputs();
                    }
            }).catch( err => {
                    console.log(err);
            });
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
                                <button type="button" name="edit" className="col-4 mx-4 mb-3 btn btn-outline-dark btn-sm" onClick={this.toggleInputs}>Edit</button>
                                <button type="button" style={{display:'none'}} name="deactivate" className="col-4 mx-4 mb-3 btn btn-outline-danger btn-sm" onClick={this.deactivateAccount}>Deactivate</button>
                                <div className="form-group form-check">
                                    <label htmlFor="First Name">First Name</label>
                                    <input onChange={this.onChange} type="text" name="fname" className="form-control" readOnly />
                                </div>
                                <div className="form-group form-check">
                                    <label htmlFor="Last Name">Last Name</label>
                                    <input onChange={this.onChange} type="text" name="lname" className="form-control" readOnly />
                                </div>
                                <div className="form-group form-check">
                                    <input onClick={ this.handleEdit } style={{display:'none'}} type="submit" className="btn btn-primary" value="Submit"/>
                                </div>
                        </form>
                    </div>
                )}
            </userContext.Consumer>
        );
    }  
}
EditUser.contextType = userContext;

function toggleFormInputs (){
    // Seleect all form inputs and toggle them
    $('.form-control').each(function(input){
        $(this).attr('readonly', !$(this).attr('readonly') );
        $(this).removeAttr('value' );
    });
}

function toggleDeactivateButton() {
    // Select deactivate button and toggle it
    if ( $('button[name="deactivate"]').css('display') === 'inline-block' ) {
        $('button[name="deactivate"]').css('display', 'none');
    } else {
        $('button[name="deactivate"]').css('display', 'inline-block');
    }
}

function toggleSubmitButton() {
    // Select submit button and toggle it
    if ( $('input[type="submit"]').css('display') === 'inline-block' ) {
        $('input[type="submit"]').css('display', 'none');
    } else {
        $('input[type="submit"]').css('display', 'inline-block');
    }
}