import { combineReducers } from 'redux';

import auth from './auth';
import signup from './signup';
import todos from './todos';

const rootReducer = combineReducers({
  auth,
  signup,
  todos,
});

export default rootReducer;
