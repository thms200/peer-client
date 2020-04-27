import { LOGIN_USER, LOGOUT_USER } from '../constants/actionTypes';

const initialState = {
  isLogin: false,
  userInfo: {},
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
      };
    default:
      return state;
  }
}
