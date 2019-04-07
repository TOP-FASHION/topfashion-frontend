import { compose, createStore, applyMiddleware } from 'redux'
import rootReducers from './reducers'
import logger from 'redux-logger'
import thunkMiddleware from "redux-thunk"

const createReduxStore = (initalState) => {
  const middlewares = [thunkMiddleware]

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
  }

  const store = createStore(
    rootReducers,
    initalState,
    compose(
      applyMiddleware(...middlewares)
    )
  )

  store.subscribe(() => {
    const state = store.getState()
    const persist = {
      cart: state.cart,
      total: state.total
    }

    window.localStorage.setItem('state', JSON.stringify(persist));
  })

  if (module.hot) {
    module.hot.accept('./reducers',
      () => store.replaceReducer(require('./reducers').default)
    )
  }

  return store
}


export default createReduxStore
