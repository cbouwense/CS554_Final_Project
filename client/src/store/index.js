import { rootReducer } from '../reducers';
import { compose, applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export const initialState = {
  user: null,
  exerciseEvents: [],
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(logger, thunk)
  )
)
