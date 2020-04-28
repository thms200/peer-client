import {
  CONNECT_CONSULTANT_STREAM,
  CONNECT_CUSTOMER_STREAM,
  GET_MEDIA_RECORDER,
  INITIAL_STREAM,
} from '../constants/actionTypes';

const initialState = {
  consultantStream: null,
  customerStream: null,
  mediaRecorder: null,
};

export function mediaStream(state = initialState, action) {
  switch(action.type) {
    case CONNECT_CONSULTANT_STREAM:
      return {
        ...state,
        consultantStream: action.consultantStream,
      };
    case CONNECT_CUSTOMER_STREAM:
      return {
        ...state,
        customerStream: action.customerStream,
      };
    case GET_MEDIA_RECORDER:
      return {
        ...state,
        mediaRecorder: action.mediaRecorder,
      };
    case INITIAL_STREAM:
      return {
        ...state,
        consultantStream: null,
        customerStream: null,
        mediaRecorder: null,
      };
    default:
      return state;
  }
}
