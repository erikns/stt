import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import tasksApp from './reducers';

let store = createStore(tasksApp, applyMiddleware(thunk));
console.log(store);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
