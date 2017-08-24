import { combineReducers } from 'redux';
import tasks from './tasks';

const common = (state = {}, action) => {
    return state;
};

const tasksApp = combineReducers({
    common,
    tasks
});

export default tasksApp;
