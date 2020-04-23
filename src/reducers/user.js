import { LOGIN_USER } from '../constants/actionTypes';

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
    default:
      return state;
  }
}
