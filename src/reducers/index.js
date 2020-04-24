import { combineReducers } from 'redux';
import { user } from './user';
import { loading } from './loading';

export default combineReducers({
  user,
  loading,
});
