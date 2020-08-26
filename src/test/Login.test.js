import React from 'react';
import App from '../App';
import Login from '../components/Account/Login';
import { shallow, mount } from "enzyme";

it("renders login form", () => {
    shallow(<Login/>);
});

