import * as types from '../constants/actionTypes';

export function loginUser(userInfo){
  return {
    type: types.LOGIN_USER,
    userInfo,
  };
}

export function logoutUser(){
  return {
    type: types.LOGOUT_USER,
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

export function connectConsultantStream(consultantStream) {
  return {
    type: types.CONNECT_CONSULTANT_STREAM,
    consultantStream,
  };
}

export function connectCustomerStream(customerStream) {
  return {
    type: types.CONNECT_CUSTOMER_STREAM,
    customerStream,
  };
}

export function getMediaRecorder(mediaRecorder) {
  return {
    type: types.GET_MEDIA_RECORDER,
    mediaRecorder,
  };
}

export function initialStream() {
  return {
    type: types.INITIAL_STREAM,
  };
}

export function getWaitingCustomers(customers) {
  return {
    type: types.GET_WAITING_CUSTOMERS,
    customers,
  };
}

export function initialWaitingCustomers() {
  return {
    type: types.INITIAL_WAITING_CUSTOMERS,
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

export function getConsultings(consultings) {
  return {
    type: types.GET_CONSULTINGS,
    consultings,
  };
}
