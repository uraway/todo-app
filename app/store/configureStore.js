import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import middleware from 'redux-thunk';

import reducer from '../reducers';

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, compose(
    applyMiddleware(middleware),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
