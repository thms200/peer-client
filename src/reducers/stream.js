import { CONNECT_CONSULTANT_STREAM, CONNECT_CUSTOMER_STREAM, INITIAL_STREAM } from '../constants/actionTypes';

const initialState = {
  consultantStream: null,
  customerStream: null,
};

export function stream(state = initialState, action) {
  switch(action.type) {
    case CONNECT_CONSULTANT_STREAM:
      return {
        ...state,
        consultantStream: action.consultantStream,
      };
    case CONNECT_CUSTOMER_STREAM:
      return {
        ...state,
        customerStream: action.customerStream,
      };
    case INITIAL_STREAM:
      return {
        ...state,
        consultantStream: null,
        customerStream: null
      };
    default:
      return state;
  }
}
