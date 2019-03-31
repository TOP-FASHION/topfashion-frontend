import { createInjectStore } from 'redux-injector'
import { compose, createStore, applyMiddleware } from 'redux';
import reducers from './reducers'
import logger from 'redux-logger'
import rootReducer from "./reducers";
import thunk from "redux-thunk";


const createReduxStore = (initalState) => {
  const middlewares = [thunk];


  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
  }

  const store = createStore(
    reducers,
    initalState,
    compose(
      applyMiddleware(...middlewares)
      /* window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__() */
    )
  );

  store.subscribe(() => {
    const state = store.getState();
    const persist = {
      cart: state.cart,
      total: state.total
    };

    window.localStorage.setItem('state', JSON.stringify(persist));
  });

  if (module.hot) {
    module.hot.accept(
      './reducers',
      () => store.replaceReducer(require('./reducers').default)
    )
  }

  return store
}


export default createReduxStore
