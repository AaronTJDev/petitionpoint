import React from 'react';
import $ from 'jquery'
import StandardMenu from './StandardMenu';
import MobileMenu from './MobileMenu';

class Menu extends React.Component {
  	constructor(props) {
    	super(props);
    	this.state = {
      		menuToggled: false
    	}
  	}

  	toggleMenu = () => {
    	this.setState({menuToggled: !this.state.menuToggled})
      	$('#slide-menu').animate({
        	opacity:0.95,
        	left: this.state.menuToggled ? "-=750" : "+=750"
      	});
  	}

  	render(){
    	return (
			<header>
				<StandardMenu 
					toggleMenu={() => this.toggleMenu()}
					authenticated={this.props.authenticated}
				/>
				<MobileMenu 
					toggleMenu={() => this.toggleMenu()}
					authenticated={this.props.authenticated}
				/>
			</header>
		);
	}

}
export default Menu;