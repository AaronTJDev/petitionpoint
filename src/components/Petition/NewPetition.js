import React from 'react';
import axios from 'axios';
import { userContext } from '../../userContext';
const UsaStates = require('usa-states').UsaStates;
const us_states = new UsaStates().arrayOf('abbreviations');

export default class NewPetition extends React.Component {
    constructor(props){
        super()
        this.state = {
            title: '',
            state: '',
            payPerSignature: 0,
            description: ''
        }
    }

    onChange = (e) => {
		var target = e.target;
        
        if ( target.name === 'title' ){
            this.setState({ title: target.value });
        } 
        else if ( target.name === 'state' ){
            this.setState({ state: target.value});
        } 
        else if ( target.name === 'description' ){
            console.log(target);
            this.setState({ descripition: target.value});
        } 
        else if ( target.name === 'payPerSignature' ){
            this.setState({ payPerSignature: target.value});
        }
	}

    render(){
        return (
            <div className="row petition mx-4 mx-sm-0">
                <form className="petition-form col-12 col-sm-12 col-md-5 mt-5">
                    <h1 className="header">New Petition</h1>
                    <div className="form-group pt-4">
                        <label htmlFor="Title">Title</label>
                        <input onChange={this.onChange} type="text" name="title" className="form-control" size="160" />
                    </div>
                    <div className="form-group py-2">
                        <label htmlFor="State">State</label>
                        <select onChange={this.onChange} name="state" className="form-control">
                            <option>&nbsp;</option>
                            {
                                us_states.map( (state, index) => (<option key={index}>{ state }</option>) )
                            }
                        </select>
                    </div>
                    <div className="form-group py-2">
                        <label htmlFor="PayPerSignature">Pay Per Signature</label>
                        <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
                            <input onChange={this.onChange} type="number" name="payPerSignature" className="form-control" />
                        </div>
                    </div>
                    <div className="form-group py-2">
                        <label htmlFor="Description">Description</label>
                        <textarea onChange={this.onChange} name="description" className="form-control" />
                    </div>
                    <div className="form-group py-2">
                        <button type="submit" className="btn btn-primary">Publish</button>
                    </div>
              	</form>
				<div id="new-petition-img" className="illustration px-md-4 px-lg-5"></div> 
          	</div>
        )
    }
}
NewPetition.contextType = userContext;