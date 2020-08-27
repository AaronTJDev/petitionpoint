import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { shallow, mount } from "enzyme";

describe("App renders with empty user object in state", () => {
  test("renders without crashing", () => {
    shallow(<App />);
  });
  
  test("user object in App state exists", () => {
    var wrapper = mount(<App />);
    expect(wrapper.state('user')).toEqual({});
  })
})
