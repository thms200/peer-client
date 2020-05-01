import {
  LOGIN_USER,
  LOGOUT_USER,
  GET_CONSULTINGS,
} from '../constants/actionTypes';

const initialState = {
  isLogin: false,
  userInfo: {},
  consultings: [],
};

export function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isLogin: true,
        userInfo: action.userInfo,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLogin: false,
        userInfo: {},
        consultings: [],
      };
    case GET_CONSULTINGS:
      return {
        ...state,
        consultings: action.consultings,
      };
    default:
      return state;
  }
}
