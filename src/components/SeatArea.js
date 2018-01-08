import React, { Component } from 'react';
import { SEAT_AREA } from '../config';

class SeatArea extends Component {
  constructor() {
    super();

    this.state = {
      isDropdown: false,
      zoneValue: 'Choose seat zone'
    }
  }

  dropdownHandler() {
    let  isDropdown  = !this.state.isDropdown; 
    this.setState({isDropdown});
  }
  
  selectedZone(event) {
    let zoneValue = event.target.innerHTML;
    this.setState({zoneValue, isDropdown: !this.state.isDropdown});
    this.props.selectZoneHander(zoneValue);
  }
  
  render(){
    return (
      <div className="seat-area-card">
        <div className="dropdown">
          <div className="dropdown__title" onClick={this.dropdownHandler.bind(this)}>{this.state.zoneValue}</div>
          <ul className={`dropdown__list ${(this.state.isDropdown)?'show':''}`}>
            { SEAT_AREA && (SEAT_AREA.map((data, i) => <li key={i} className="dropdown__list--item" onClick={this.selectedZone.bind(this)}>{data.zone}</li>))}
          </ul>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}


export default SeatArea;