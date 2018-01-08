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
      selected: false,
      keyZone: 'A'
    }
  }
  selectZoneHander(value, keyZone) {
    this.setState({seatValue: value, selected: true, keyZone});
  }

  sendBillHandler(billAmout) {
    this.props.sendBill(billAmout);
  }

  render() {
    return (
      <div className="">
        <NavigationBar/>
        <SeatArea selectZoneHander={this.selectZoneHander.bind(this)}>
          {(this.state.selected)?<SeatComp seatValue={this.state.seatValue} keyZone={this.state.keyZone} sendBillData={this.sendBillHandler.bind(this)} getBillData={this.props.billData}/>:'' }
        </SeatArea>
      </div>
    );
  }
}

const dispatchToProps = (dispatch) => {
  return bindActionCreators({
    sendBill: EventDispatcher.sendBill
  }, dispatch);
};

const stateToProps = (state) => {
  return {
    billData: state.billData
  };
};

export default connect(stateToProps, dispatchToProps)(App);
