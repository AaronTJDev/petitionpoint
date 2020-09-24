import React from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../userContext';

class MobileMenu extends React.Component {
  	render(){
    	return (
            <div className="h-100" id="slide-menu">
              	<ul className="menu-nav"  id="slide-nav">
                	<li className="nav-item">
                  		<Link to="/" onClick={this.props.toggleMenu} className="nav-link mt-4">Turn-in</Link>
                	</li>
                	<li className="nav-item">
                  		<Link to="/petition" onClick={this.props.toggleMenu} className="nav-link">Petitions</Link>
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
              	<div id="slide-menu-footer" onClick={this.props.toggleMenu}>
                	<h1 className="p-4">Close</h1>
              	</div>
            </div>
    	);
  	}
}
MobileMenu.contextType = userContext;

export default MobileMenu;