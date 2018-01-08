import { Events } from '../constants';

const initialState = {
  fetched: false,
  totalPrice: null,
  error: null
};

const billData = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case Events.SEND_BILL.SUCCESS:
      return { ...state, fetched: true, totalPrice: payload };
    case Events.SEND_BILL.ERROR:
      return { ...state, fetched: false, error: payload };
    default:
      return state;
  }
};

export default billData;