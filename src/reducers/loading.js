import { LOADING } from '../constants/actionTypes';

const initialState = {
  isLoading: false,
};

export function loading(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
}
