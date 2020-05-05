import { user } from './user';

const initialState = {
  isLogin: false,
  userInfo: {},
  consultings: [],
};

const mockUser = {
  type: 'LOGIN_USER',
  userInfo: {
    exp: 1588669848,
    iat: 1588583448,
    id: 'testid1234',
    iss: 'minsun',
    name: 'ken',
    picture: 'https://vanilla.com/test',
  },
};

const mockData = [
  {
    audio: 'https://vanilla.com/test123',
    email: '123@naver.com',
    isVoice: true,
    name: 'ken',
    timestamp: 1588242957683,
  },
  {
    audio: 'https://vanilla.com/test456',
    email: 'yellow@gmail.com',
    isVoice: true,
    name: 'hoho',
    timestamp: 1588243837606,
  }
];

const mockLogoutAction = {
  type: 'LOGOUT_USER'
};

const mockConsultignsAction = {
  type: 'GET_CONSULTINGS',
  consultings: mockData,
};

describe('<User Reducer>', () => {
  let state = initialState;
  beforeEach(() => {
    state = user(initialState, mockUser);
    state = user(state, mockConsultignsAction);
  });
  it('should be changed isLogin and userInfo if user is login', () => {
    expect(state.isLogin).toEqual(true);
    expect(state.userInfo.name).toEqual('ken');
    expect(state.userInfo.iss).toEqual('minsun');
    expect(state.consultings.length).toEqual(2);
  });

  it('should initialize if user is logout', () => {
    state = user(state, mockLogoutAction);
    expect(state.isLogin).toEqual(false);
    expect(Object.keys(state.userInfo).length).toEqual(0);
    expect(state.consultings.length).toEqual(0);
  });

  it('should get consultings history if action is GET_CONSULTINGS', () => {
    expect(state.consultings.length).toEqual(2);
    expect(state.consultings[0].name).toEqual('ken');
    expect(state.consultings[1].name).toEqual('hoho');
  });
});
