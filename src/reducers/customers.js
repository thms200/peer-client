import {
  GET_WAITING_CUSTOMERS,
  INITIAL_WAITING_CUSTOMERS,
  GET_CURRENT_CUSTOMER,
  INITIAL_CURRENT_CUSTOMER,
} from '../constants/actionTypes';

const initialState = {
  waitingCustomers: [],
  currentCustomer: '',
};

export function customers(state = initialState, action) {
  switch (action.type) {
    case GET_WAITING_CUSTOMERS:
      return {
        ...state,
        waitingCustomers: action.customers,
      };
    case INITIAL_WAITING_CUSTOMERS:
      return {
        ...state,
        waitingCustomers: [],
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
