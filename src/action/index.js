import { Events } from '../constants';
import ProductAdapter from '../adapter/ProductAdapter';

const sendBill = (action) => {
  return (dispatch) => {
    ProductAdapter.sendBill(action)
    .then(response => {
      dispatch({ type: Events.SEND_BILL.SUCCESS, payload: response });
    })
    .catch(error => {
      dispatch({ type: Events.SEND_BILL.ERROR, payload: error });
    });
  }
}

export const EventDispatcher = {
  sendBill
}