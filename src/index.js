import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore,combineReducers} from 'redux'
import {Provider} from 'react-redux'
import productreducer from './redux/reducers/product-reducers'
import userreducer from './redux/reducers/user-reducers'
import commonReducer from './redux/reducers/common-reducers'

const allReducers = combineReducers({
	product: productreducer,
	user:userreducer,
	common:commonReducer
})
 const store=createStore(allReducers,{common:{serverURL:'http://18.213.86.227:4000'}}, window.devToolsExtension&&window.devToolsExtension());

 ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}><App /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
