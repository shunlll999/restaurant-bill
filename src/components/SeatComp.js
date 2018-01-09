import React, { Component } from 'react';
import { SEAT_AREA, PRICE_RULE, PROMOLIST, PRICES } from '../config';

class SeatComp extends Component {
  constructor() {
    super();

    this.state = {
      isDropdown: false,
      tableValue: 'Choose table',
      people: 0,
      orderPrice: 0,
      promotionKey: '',
      discount: 0,
      billAmout: 0,
      disoutPercentge: '0 %',
      totalPrice: 0,
      keyZone: '',
      excludePromo:false
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

  onPeopleChange(event) {
    let people = Number(event.target.value);
    this.setState({people, billAmout: PRICES*people});
  }

  onOrderChange(event) {
    let orderPrice = Number(event.target.value);
    this.setState({orderPrice});
  }

  onPromoChange(event) {
    let promotionKey = event.target.value;
    let discount = (this.getPercenatgeDiscount(promotionKey)!== 1)?this.getPercenatgeDiscount(promotionKey)*100:1;
    this.setState({disoutPercentge: `${(discount !== 1)?`${discount} %`:`${discount*PRICES} Baht`}`});
    this.setState({promotionKey});
  }

  onSubmitHandle() {
    let { people, tableValue, orderPrice } = this.state;
    let { keyZone } = this.props;
    let priceAmout = this.state.people*PRICES;
    let sumPrice = priceAmout+orderPrice;
    let discount = this.getPercenatgeDiscount(this.state.promotionKey);
    let promotionKey = this.state.promotionKey;
    let billData = { people, priceAmout, discount, promotionKey, tableValue, orderPrice, keyZone };
    this.setState({billAmout: sumPrice});
    this.props.sendBillData(billData);
  }

  getPercenatgeDiscount(promotionKey) {
    switch(promotionKey) {
      case PROMOLIST.LUCKY_ONE:
        return PRICE_RULE.discount_a;
      case PROMOLIST.LUCKY_TWO:
        return PRICE_RULE.discount_c;
      case PROMOLIST.FOUR_PAY_THREE:
        return 1
      default: 
        return 0;
    }
  }

  renderTotalPrice() {
    const { getBillData } = this.props;
    let { totalPrice } = getBillData;
    if( totalPrice != null ){
      const { total } = totalPrice;
      return total;
    }else{
      return 'Caculating..'
    }
  }

  render() {
    const { getBillData } = this.props;
    let { totalPrice } = getBillData;
    let doExclude = false;
    let doPromo = false;
    if( totalPrice != null ){
      const { excludePromo, extraPromo } = totalPrice;
      doExclude = excludePromo;
      doPromo = extraPromo;
    }else{
      doExclude = false;
      doPromo = false;
    }

    return (
      <div className="seat-area-content">
        <div className="seat-area-content__title">Seat on {this.props.seatValue}</div>
        <div className="seat-area-content__content">
          <div className="seat-area-content__content--title" onClick={this.tableListHandle.bind(this)}>{this.state.tableValue}</div>
          <ul className={`seat-area-content__content--list ${(this.state.isDropdown)?'show':''}`}>
            {this.getSeatZone()}
          </ul>
          <div><span>People : </span><input onChange={this.onPeopleChange.bind(this)} className="seat-area-content__content--input" type="number" placeholder="Number"/></div>
          <div><span>Additional Order Price : </span><input  onChange={this.onOrderChange.bind(this)} className="seat-area-content__content--input" type="number"  placeholder="Extra order"/></div>
          <div><span>Promotion code : </span><input  onChange={this.onPromoChange.bind(this)} className="seat-area-content__content--input" type="text"  placeholder="eg. 4PAY3"/><span className={`seat-area-content__content--discount ${(doExclude)?'show':''}`}> promotion code excluded</span></div>
          <hr/>
          <div><span>Bill amout : </span>{`${this.state.billAmout} Baht`}</div>
          <hr/>
          <div><span>Discount : </span>{this.state.disoutPercentge}<span className={`seat-area-content__content--discount ${(doExclude)?'show':''}`}> discount excluded</span></div>
          <div className="seat-area-content__content--amout"><span>Total price : </span>{`${this.renderTotalPrice()} Baht`}<span className={`seat-area-content__content--extra ${(doPromo)?'show':''}`}> extra promotion include 25% discount</span></div>
          <hr/>
        </div>
        <button type="button" onClick={this.onSubmitHandle.bind(this)} className="seat-area-content__btn">Submit</button>
      </div>
    );
  }
} 

export default SeatComp;