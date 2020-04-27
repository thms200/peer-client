import {
  GET_CUSTOMERS,
  INITIAL_CUSTOMERS,
  GET_CURRENT_CUSTOMER,
  INITIAL_CURRENT_CUSTOMER,
} from '../constants/actionTypes';

const initialState = {
  customers: [],
  currentCustomer: '',
};

export function customers(state = initialState, action) {
  switch (action.type) {
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: action.customers,
      };
    case INITIAL_CUSTOMERS:
      return {
        ...state,
        customers: [],
      };
    case GET_CURRENT_CUSTOMER:
      return {
        ...state,
        currentCustomer: action.customer,
      };
    case INITIAL_CURRENT_CUSTOMER:
      return {
        ...state,
        currentCustomer: '',
      };
    default:
      return state;
  }
}
