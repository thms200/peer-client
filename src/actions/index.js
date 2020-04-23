import * as types from '../constants/actionTypes';

export function loginUser(userInfo){
  return {
    type: types.LOGIN_USER,
    userInfo,
  };
}
