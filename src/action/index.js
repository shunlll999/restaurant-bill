import { Events } from '../constants';
import ProductAdapter from '../adapter/ProductAdapter';

const getProduct = (action) => {
  return (dispatch) => {
    ProductAdapter.fetchCollection()
    .then(response => {
      dispatch({ type: Events.PRODUCT_FETCH.SUCCESS, payload: response });
    })
    .catch(error => {
      dispatch({ type: Events.PRODUCT_FETCH.ERROR, payload: error });
    });
  }
}

export const EventDispatcher = {
  getProduct
}