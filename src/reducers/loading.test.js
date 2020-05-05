import { loading } from './loading';

const initialState = {
  isLoading: false,
};

const mockLoadingAction = {
  type: 'LOADING',
  isLoading: true,
};


const mockUnLoadingAction = {
  type: 'LOADING',
  isLoading: false,
};

describe('<Loading Reducer>', () => {
  it('should be toggled if action is LOADING', () => {
    let state = initialState;
    expect(state.isLoading).toEqual(false);
    state = loading(state, mockLoadingAction);
    expect(state.isLoading).toEqual(true);
    state = loading(state, mockUnLoadingAction);
    expect(state.isLoading).toEqual(false);
  });
});
