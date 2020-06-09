import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { userContext } from './userContext';
import Register from './components/Account/Register';
import Login from './components/Account/Login';
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

  getSession = ( ) => {
    console.log("get session called");
    var sid = document.cookie ? document.cookie
    .split('; ')
    .find(row => row.startsWith('sid'))
    .split('=')[1] : null;

    console.log(sid);

    axios.get(`http://localhost:3000/user/${sid}`)
      .then( res => {
        console.log(res)
        if ( res.data ){
          this.setState({ user: res.data })
        }
      })
      .catch( err => {
        console.log(err);
      });
  }

  login = ( user ) => {
    this.setState({ user: user });
  }

  logout = () => {
    this.setState({ user: null });
  }

  render(){
    // Value object to be consumed by context consumers.
    const value = {
      user: this.state.user,
      loginUser: this.login
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
                  !this.state.user._id ?
                  <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                  </li> :
                  <li><p className="nav-greeting">Hello, { this.state.user.fname }</p></li>
                }
                {
                  !this.state.user._id ?
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                  </li> :
                  null
                }
              </ul>
            </nav>
            <div className="container">
              <Route path="/turnin" />
              <Route path="/petition"  />
              <Route path="/login" component = { Login } />
              <Route path="/register" component = { Register } />
              
            </div>
            <footer className="fixed-bottom">
  
            </footer>
          </div>
        </Router>
      </userContext.Provider>
    );
  }

}

export default App;
