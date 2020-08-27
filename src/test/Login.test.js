import React from 'react';
import Login from '../components/Account/Login';
import { shallow, mount } from "enzyme";

describe("checking login form renders and reads form input values" , () =>{
    test("renders login form", () => {
        shallow(<Login/>);
    });
    
    test("value of state.email matches email target value", () => {
        var wrapper = mount(<Login />);
    
        wrapper.find('[name="email"]').simulate('change', {
            target: { name: 'email', value: 'john@email.com' }
        });
    
        expect(wrapper.state('email')).toEqual('john@email.com');
    });
    
    test("value of state.password matches password target value", () => {
        var wrapper = mount(<Login />);
    
        wrapper.find('[name="password"]').simulate('change', {
            target: { name: 'password', value: '#5559al' }
        });
    
        expect(wrapper.state('password')).toEqual('#5559al');
    });
});
