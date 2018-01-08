import React, { Component } from 'react';
import { SEAT_AREA } from '../config';

class SeatComp extends Component {
  constructor() {
    super();

    this.state = {
      isDropdown: false,
      tableValue: 'Choose table'
    }
  }

  getSeatZone () {
    const { seatValue } = this.props;
    if(seatValue) {
      const zone = SEAT_AREA.filter(data => (data.zone === seatValue ))[0];
      return zone.seats.map((data,i) => <li key={i} onClick={this.selectedTable.bind(this)} className="seat-area-content__content--item">{`${data.table} people ${data.max}`}</li>);
    }else {
      return <div>Fetching...</div>
    }
  }

  selectedTable(event) {
    let tableValue = event.target.innerHTML;
    this.setState({tableValue, isDropdown: !this.state.isDropdown});
  }

  tableListHandle() {
    let  isDropdown  = !this.state.isDropdown; 
    this.setState({isDropdown});
  }

  render() {
    return (
      <div className="seat-area-content">
        <div className="seat-area-content__title">Seat on {this.props.seatValue}</div>
        <div className="seat-area-content__content">
          <div className="seat-area-content__content--title" onClick={this.tableListHandle.bind(this)}>{this.state.tableValue}</div>
          <ul className={`seat-area-content__content--list ${(this.state.isDropdown)?'show':''}`}>
            {this.getSeatZone()}
          </ul>
          <div><span>People : </span><input className="seat-area-content__content--input" type="number" placeholder="Number"/></div>
          <div><span>Promotion code : </span><input className="seat-area-content__content--input" type="text"  placeholder="eg. 4PAY3"/></div>
          <div><span>Discount : </span>15%</div>
          <div className="seat-area-content__content--amout"><span>Bill amout : </span>1000 baht</div>
        </div>
      </div>
    );
  }
} 

export default SeatComp;