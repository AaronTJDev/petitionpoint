import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { userContext } from './userContext';
import Register from './components/Account/Register';
import Logout from './components/Account/Logout';
import Login from './components/Account/Login';
import Edit from './components/Account/Edit';
import axios from 'axios';
import './styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    }
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
      // check for cookie titiled 'sid'
      var sid = document.cookie
        .split('; ')
        .find( row => row.startsWith('sid') )

      // if found, get value of sid
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
          this.setState({ user: res.data })
        }
      })
      .catch( err => {
        console.log(err);
      });
    }

    return false
  }

  login = ( user ) => {
    this.setState({ user: user });
  }

  logout = () => {
    axios.post('http://localhost:3000/user/logout/')
      .then( res => {
        if ( res.status === 200 ){
          this.setState({ user: null });
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
            <nav>
              <ul className="nav">
                <img src="img/logo.png" id="logo" className="nav-item" alt="Petition Point Logo" />
                <li className="nav-item">
                  <Link to="/" className="nav-link">Turn-in</Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">Petitions</Link>
                </li>
                {
                  isEmpty(this.state.user) ?
                  <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                  </li> :
                  <li>
                    <Link to="/logout" className="nav-link">Logout</Link>
                  </li>
                }
                {
                  isEmpty(this.state.user) ?
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                  </li> :
                  <li className="nav-item">
                    <Link to="/user" className="nav-link">Account</Link>
                  </li>
                }
              </ul>
            </nav>
            <div className="container">
              <Route path="/turnin" />
              <Route path="/petition"  />
              <Route path="/login" component = { Login } />
              <Route path="/register" component = { Register } />
              <Route path="/logout" component = { Logout }/>
              <Route path="/user/edit" component = { Edit }/>
              
            </div>
            <footer className="fixed-bottom">
  
            </footer>
          </div>
        </Router>
      </userContext.Provider>
    );
  }

}

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
          console.log('object has values');
  }
  console.log('object is empty');
  return true;
}

export default App;