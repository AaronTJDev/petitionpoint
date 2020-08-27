import React from 'react';
import Register from '../components/Account/Register';
import { render } from '@testing-library/react';
import { shallow, mount } from "enzyme";

describe("checking login form renders and reads form input values" , () =>{
    test("renders login form", () => {
        shallow(<Register/>);
    });

    test("value of state.fname matches fname target value", () => {
        var wrapper = shallow(<Register />);
    
        wrapper.find('[name="fname"]').simulate('change', {
            target: { name: 'fname', value: 'john' }
        });
    
        expect(wrapper.state('fname')).toEqual('john');
    });
    
    test("value of state.lname matches lname target value", () => {
        var wrapper = shallow(<Register />);
    
        wrapper.find('[name="lname"]').simulate('change', {
            target: { name: 'lname', value: 'jacobs' }
        });
    
        expect(wrapper.state('lname')).toEqual('jacobs');
    });
    
    test("value of state.email matches email target value", () => {
        var wrapper = shallow(<Register />);
    
        wrapper.find('[name="email"]').simulate('change', {
            target: { name: 'email', value: 'john@email.com' }
        });
    
        expect(wrapper.state('email')).toEqual('john@email.com');
    });
    
    test("value of state.password matches password target value", () => {
        var wrapper = shallow(<Register />);
    
        wrapper.find('[name="password"]').simulate('change', {
            target: { name: 'password', value: '#5559al' }
        });
    
        expect(wrapper.state('password')).toEqual('#5559al');
    });

    test("value of state.vpassword matches vpassword target value", () => {
        var wrapper = shallow(<Register />);
    
        wrapper.find('[name="vpassword"]').simulate('change', {
            target: { name: 'vpassword', value: '#5559al' }
        });
    
        expect(wrapper.state('vpassword')).toEqual('#5559al');
    });
});

describe("register button is enabled/disabled based on form input", () => {
    test("button is disabled", () => {
        var wrapper = shallow(<Register />);

        expect(wrapper.find('[value="Register"]').props().disabled).toEqual(true);
    });

    test("button is enabled", () => {
        const wrapper = shallow(<Register />);

        // the following wrapper.find calls are to simulate filling out the registration form
        wrapper.find('[name="fname"]').simulate('change', {
            target: { name: 'fname', value: 'john' }
        });

        wrapper.find('[name="lname"]').simulate('change', {
            target: { name: 'lname', value: 'jacobs' }
        });

        wrapper.find('[name="email"]').simulate('change', {
            target: { name: 'email', value: 'john@email.com' }
        });

        wrapper.find('[name="password"]').simulate('change', {
            target: { name: 'password', value: '#5559alg' }
        });

        wrapper.find('[name="vpassword"]').simulate('change', {
            target: { name: 'vpassword', value: '#5559alg' }
        });

        expect(wrapper.find('[value="Register"]').props().enabled).toEqual(true);
    });
});