import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { EventDispatcher } from '../action';

import NavigationBar from '../components/NavigationBar';

class App extends Component {

  render() {
    return (
      <div className="">
        <NavigationBar/>
      </div>
    );
  }
}

const dispatchToProps = (dispatch) => {
  return bindActionCreators({
    getProducts: EventDispatcher.getProduct
  }, dispatch);
};

const stateToProps = (state) => {
  return {
    products: state.products
  };
};

export default connect(stateToProps, dispatchToProps)(App);
