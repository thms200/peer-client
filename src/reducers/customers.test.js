import { customers } from './customers';

const initialState = {
  waitingCustomers: [],
  currentCustomer: '',
};

// [mock data]
const mockWaitingCustomersOne = [
  {
    nickname: 'minsun',
    mode: 'Voice',
    consultant: 'consultantOne',
    signal: { type: 'offer', sdp: 'ake937ska' },
  },
  {
    nickname: 'davin',
    mode: 'Voice',
    consultant: 'consultantTwo',
    signal: { type: 'offer', sdp: 'aek1029zk' },
  }
];

const mockWaitingCustomersTwo = [
  {
    nickname: 'minsun',
    mode: 'Voice',
    consultant: 'consultantOne',
    signal: { type: 'offer', sdp: 'ake937ska' },
  },
  {
    nickname: 'davin',
    mode: 'Voice',
    consultant: 'consultantTwo',
    signal: { type: 'offer', sdp: 'aek1029zk' },
  },
  {
    nickname: 'ken',
    mode: 'Camera',
    consultant: 'consultantOne',
    signal: { type: 'offer', sdp: 'slekj13k4kxkxsq' },
  }
];

const currentCustomerOne = {
  consultant: 'test123test123',
  id: 'sek3xlxaw3123',
  mode: 'Voice',
  nickname: 'hoho',
  signal: { type: 'offer', sdp: 'eklrjaalke' },
};

const currentCustomerTwo = {
  consultant: 'test456test456',
  id: 'aelraekrjaekl232',
  mode: 'Camera',
  nickname: 'yellow',
  signal: { type: 'offer', sdp: 'aeraerae' },
};

// [mock action]
const waitingCustomersActionOne = {
  type: 'GET_WAITING_CUSTOMERS',
  customers: mockWaitingCustomersOne,
};

const waitingCustomersActionTwo = {
  type: 'GET_WAITING_CUSTOMERS',
  customers: mockWaitingCustomersTwo,
};

const initialWaitingCusomerAction = {
  type: 'INITIAL_WAITING_CUSTOMERS',
};

const getCurrentCustmerActionOne = {
  type: 'GET_CURRENT_CUSTOMER',
  customer: currentCustomerOne,
};

const getCurrentCustmerActionTwo = {
  type: 'GET_CURRENT_CUSTOMER',
  customer: currentCustomerTwo,
};

const initialCurrentCustomer = {
  type: 'INITIAL_CURRENT_CUSTOMER',
};

describe('<Customer Reducder>', () => {
  it('<GET_WAITING_CUSTOMERS>: should get current waiting customers', () => {
    const stateOne = customers(initialState, waitingCustomersActionOne);
    const stateTwo = customers(stateOne, waitingCustomersActionTwo);
    expect(stateOne.waitingCustomers).toEqual(mockWaitingCustomersOne);
    expect(stateTwo.waitingCustomers).toEqual(mockWaitingCustomersTwo);
  });

  it('<INITIAL_WAITING_CUSTOMERS>: should initialize waiting customers', () => {
    let state = customers(initialState, waitingCustomersActionOne);
    expect(state.waitingCustomers.length).toEqual(2);
    state = customers(state, initialWaitingCusomerAction);
    expect(state.waitingCustomers.length).toEqual(0);

    state = customers(state, waitingCustomersActionTwo);
    expect(state.waitingCustomers.length).toEqual(3);
    state = customers(state, initialWaitingCusomerAction);
    expect(state.waitingCustomers.length).toEqual(0);
  });

  it('<GET_CURRENT_CUSTOMER>: should get information of current customer', () => {
    let state = customers(initialState, getCurrentCustmerActionOne);
    expect(state.currentCustomer.nickname).toEqual('hoho');

    state = customers(state, getCurrentCustmerActionTwo);
    expect(state.currentCustomer.nickname).toEqual('yellow');
  });

  it('<INITIAL_CURRENT_CUSTOMER: should initialize current customer', () => {
    let state = customers(initialState, getCurrentCustmerActionOne);
    expect(state.currentCustomer.nickname).toEqual('hoho');

    state = customers(state, initialCurrentCustomer);
    expect(state.currentCustomer.nickname).toEqual(undefined);
  });
});
