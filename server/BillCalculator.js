const config  = require('./config');
const pkey = config.priceList;
const pRule = config.priceRule;

const usingPromotion = (promotionKey, query) => {
  let priceAmout = {};
  let totalPrice = Number(query.priceAmout)+Number(query.orderPrice);
  priceAmout.amout = Number(totalPrice);
  if(promotionKey != pkey.FOUR_PAY_THREE){
    let priceAll = Number(query.priceAmout)+Number(query.orderPrice);
    let price = priceAll-(priceAll*query.discount);
    priceAmout.total = price;
  }else {
    
    let people = query.people-1;
    let price = (people*config.price)+Number(query.orderPrice);
    priceAmout.total = price;
  }
  priceAmout.discount = query.discount;
  priceAmout.excludePromo = query.excludePromo;
  priceAmout.extraPromo = query.extraPromo;
  return priceAmout;
}

exports.Bill = (promotionKey, query) => {
  let bill = {};
  if(Number(query.people) == 1 && promotionKey != pkey.FOUR_PAY_THREE && promotionKey != pkey.LUCKY_TWO){
    let realPrice = Number(query.priceAmout)+Number(query.orderPrice);
    if( realPrice >= config.maxOne ){
      query.extraPromo = true;
      promotionKey = pkey.LUCKY_ONE;
      query.discount = pRule.discount_a;
    }
    bill = usingPromotion(promotionKey, query);
  }else if(query.people > 1 && promotionKey != pkey.FOUR_PAY_THREE){
    bill = usingPromotion(promotionKey, query);
  }else if(query.people < 4){
    promotionKey = '';
    query.discount = 0;
    query.excludePromo = true;
    bill = usingPromotion(promotionKey, query);
  }else {
    bill = usingPromotion(promotionKey, query);
  }
  return bill;
}

