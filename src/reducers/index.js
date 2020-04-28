import { combineReducers } from 'redux';
import { user } from './user';
import { loading } from './loading';
import { socket } from './socket';
import { customers } from './customers';
import { stream } from './stream';

export default combineReducers({
  user,
  loading,
  socket,
  customers,
  stream,
});
