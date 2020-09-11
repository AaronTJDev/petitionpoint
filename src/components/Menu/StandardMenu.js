import React from 'react';
import $ from 'jquery'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { userContext } from '../../userContext';

class StandardMenu extends React.Component {

  render(){
    return (
          <nav className="navbar navbar-expand-md">
            <Link to="/" className="nav-item"><img src="img/logo.png" id="logo" className="navbar-brand" alt="Petition Point Logo" /></Link>
            <ul className="nav"  id="desktop-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">Turn-in</Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">Petitions</Link>
              </li>
              {
                this.props.authenticated ?
                <li className="nav-item">
                    <Link to="/logout" className="nav-link"  onClick={this.props.toggleMenu}>Logout</Link>
                </li> :
                <li>
                    <Link to="/login" className="nav-link"  onClick={this.props.toggleMenu}>Login</Link>
                </li>
              }
              {
                this.props.authenticated ?
                <li className="nav-item">
                  <Link to="/edit" className="nav-link"  onClick={this.props.toggleMenu}>Account</Link>
                </li> :
                <li className="nav-item">
                  <Link to="/register" className="nav-link"  onClick={this.props.toggleMenu}>Register</Link>
                </li>
              }
            </ul>
            <div className="h-100" onClick={this.props.toggleMenu}>
              <i className="fas fa-bars p-2" id="menu-icon"></i>
            </div>
          </nav>
    );
  }

}
StandardMenu.contextType = userContext;

export default StandardMenu;