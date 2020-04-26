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

export function connectSocket(socket) {
  return {
    type: types.CONNECT_SOCKET,
    socket,
  };
}

export function initialSocket() {
  return {
    type: types.INITIAL_SOCKET,
  };
}

export function getCustomers(customers) {
  return {
    type: types.GET_CUSTOMERS,
    customers,
  };
}

export function initialCustomers() {
  return {
    type: types.INITIAL_CUSTOMERS,
  };
}

export function getCurrentCustomer(customer) {
  return {
    type: types.GET_CURRENT_CUSTOMER,
    customer,
  };
}

export function initialCurrentCustomer() {
  return {
    type: types.INITIAL_CURRENT_CUSTOMER,
  };
}
