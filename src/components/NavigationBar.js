import React from 'react';
import logo from '../assets/images/logo.1.svg';

const NavigationBar = () => (
  <div className="navigation">
    <img className="navigation__brand" src={logo} alt="logo"/>
  </div>
);

export default NavigationBar;