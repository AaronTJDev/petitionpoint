import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { userContext } from './userContext';
import Register from './components/Account/Register';
import Login from './components/Account/Login';

import './styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  login = ( user ) => {
    this.setState({ user: user })
  }

  onComponentDidMount(){
    this.context.foo = true;
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
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">Register</Link>
                </li>
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
