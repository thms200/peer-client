import { CONNECT_SOCKET, INITIAL_SOCKET } from '../constants/actionTypes';

const initialState = {
  socket: null,
};

export function socket(state = initialState, action) {
  switch(action.type) {
    case CONNECT_SOCKET:
      return {
        ...state,
        socket: action.socket,
      };
    case INITIAL_SOCKET:
      return {
        ...state,
        socket: null,
      };
    default:
      return state;
  }
}
