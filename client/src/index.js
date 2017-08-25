import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import tasksApp from './reducers';
import { getAllTasks, loadPersistedToken } from './actions';

let store = createStore(tasksApp, applyMiddleware(thunk));

const persistedToken = sessionStorage.getItem('tasksAppToken');
if (persistedToken) {
    store.dispatch(loadPersistedToken());
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
