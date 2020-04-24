import * as types from '../constants/actionTypes';

export function loginUser(userInfo){
  return {
    type: types.LOGIN_USER,
    userInfo,
  };
}

export function setLoading(isLoading){
  return {
    type: types.LOADING,
    isLoading,
  };
}
