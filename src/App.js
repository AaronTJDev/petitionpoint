import React from 'react';
import $ from 'jquery'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { userContext } from './userContext';
import Home from './components/Home';
import Menu from './components/Menu/Menu';
import Account from './components/Account/Account';
import Petition from './components/Petition/Petition';
import Turnin from './components/Turnins/Turnin';
import axios from 'axios';
import './assets/style/css/styles.css';
import './assets/style/css/account.css';
import './assets/style/css/petition.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            authenticated: false
        }
    }

    onPageChange(){
        $(window).on( 'load', function () {
            var pageHeight = document.body.scrollHeight < 900 ? parseInt($('#root').css('height')) * 1.33 : parseInt($('#root').css('height'));
            $('body').css('height', `${pageHeight}px`);
        });
    }

    componentDidMount(){
        this.getSession();
    }

    componentDidUpdate(){
        if(this.state.user === {}){
            this.getSession();
        }
    }

    isSession = () => {
    	// Check if session id exists
    	if ( document.cookie.length > 0 ) {
			var sid = document.cookie
				.split('; ')
				.find( row => row.startsWith('sid') )

			if ( sid ){
				return sid.split('=')[1];;
			}
    	}
    	return false;
  	}

	getSession = ( ) => {
		// Check if session exists
    	if( this.isSession() ){
    	  	axios.get(`http://localhost:3000/user/${this.isSession()}`)
    	  		.then( res => {
    	    		console.log(res.data);
    	    		if ( res.data ){
    	      		this.setState({ user: res.data, authenticated: true })
    	    	}
    	  	})
    	  	.catch( err => {
    	   		console.log(err);
    	  	});
    	}
    	return false;
  	}

	login = ( user ) => {
		this.setState({ user: user, authenticated: true });
	}

	logout = () => {
		axios.post('http://localhost:3000/user/logout/')
    		.then( res => {
        		if ( res.status === 200 ){
          		this.setState({ user: null, authenticated: false });
        	}
      	})
      	.catch( err => {
        	if ( err ){
          	// Error handling for front-end here
        	}
      	});
  	}

	render(){
		// Value object to be consumed by context consumers.
		const value = {
			user: this.state.user,
			loginUser: this.login,
			logoutUser: this.logout
		};

		return (
			<userContext.Provider value={ value }>
				<Router>
					<div className="App">
						<Menu user={ this.state.user } authenticated={ this.state.authenticated }/>
						<main className="container">
							<Switch>
								<Route exact path="/" component = { Home } />
								<Route path="/turnin" component = { Turnin }/>
								<Route path="/petition" component = { Petition }/>
								<Account/>
							</Switch>
						</main>
						<footer className="footer text-muted">
							<div className="container">
								&copy; 2020 - Petition Point - <a href="example.com">Privacy</a>
							</div>
						</footer>
					</div>
				</Router>
			</userContext.Provider>
		);
	}
}
export default App;