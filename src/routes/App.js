import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { EventDispatcher } from '../action';

import NavigationBar from '../components/NavigationBar';
import SeatArea from '../components/SeatArea';
import SeatComp from '../components/SeatComp';

class App extends Component {
  constructor() {
    super();

    this.state = {
      seatValue: '',
      selected: false
    }
  }
  selectZoneHander(value) {
    this.setState({seatValue: value, selected: true});
  }

  render() {
    return (
      <div className="">
        <NavigationBar/>
        <SeatArea selectZoneHander={this.selectZoneHander.bind(this)}>
          {(this.state.selected)?<SeatComp seatValue={this.state.seatValue}/>:''}
        </SeatArea>
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
