import React from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../userContext';

class StandardMenu extends React.Component {
	render(){
    	return (
          	<nav className="navbar navbar-expand-md py-0">
            	<Link to="/" className="nav-item"><img src="../img/logo.png" id="logo" className="navbar-brand" alt="Petition Point Logo" /></Link>
            	<userContext.Consumer>
					{ context => (
						<ul className="nav"  id="desktop-nav">
							{
								context.authenticated ?
								<>
									<li className="nav-item">
										<Link to="/" className="nav-link">Turn-in</Link>
									</li>
									<li className="nav-item">
										<Link to="/petition" className="nav-link">Petitions</Link>
									</li>
									<li className="nav-item">
										<Link to="/" className="nav-link">Circulators</Link>
									</li>
									<div className="dropdown" id="account-dropdown">
										<button type="button" className="btn fas fa-user-circle pt-3"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
										<div className="dropdown-menu my-2" aria-labelledby="dropdownMenuButton">
											<Link to="/logout" className="dropdown-item nav-link"  onClick={this.props.toggleMenu}>Logout</Link>
											<Link to="/edit" className="dropdown-item nav-link"  onClick={this.props.toggleMenu}>Account</Link>
										</div>
									</div>
								</>
								:
								<>
									<li className="nav-item"><Link to="/login" className="nav-link"  onClick={this.props.toggleMenu}>Login</Link></li>
									<li className="nav-item"><Link to="/register" className="nav-link"  onClick={this.props.toggleMenu}>Register</Link></li>
								</>
							}
						</ul>
						)
					}
				</userContext.Consumer>
            	<div className="h-100" onClick={this.props.toggleMenu}>
              		<i className="fas fa-bars p-2" id="menu-icon"></i>
            	</div>
          	</nav>
    	);
  	}
}
StandardMenu.contextType = userContext;

export default StandardMenu;