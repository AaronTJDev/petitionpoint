import React from 'react';
import App from '../App';
import Login from '../components/Account/Login';
import { shallow, mount } from "enzyme";

test("renders login form", () => {
    shallow(<Login/>);
});

test("state matches target value", () => {
    wrap.find('input').simulate('change', {
        target: { value: 'hello' }
    })
})