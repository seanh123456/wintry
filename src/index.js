import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import auth from './authentication/reducers'
import finance from './finance/reducers'
import recipe from './recipe/reducers'

import './scss/index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'

const rootReducer = combineReducers({
  auth,
  finance,
  recipe
})


const composeEnhancers = composeWithDevTools({})
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

//store.subscribe(() => console.log(store.getState()))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
