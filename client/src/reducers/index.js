import actionTypes from '../actionTypes';

const initialState = {
    tasks: [],
    tasksFailure: false
}

export default (state = initialState, action) => {
    console.log('In reducer');
    console.log(state);
    console.log('action');
    console.log(action.payload);
    switch (action.type) {
        case actionTypes.GET_ALL_TASKS_SUCCESS:
            return Object.assign({}, state, {
                tasks: action.payload
            });

        case actionTypes.GET_ALL_TASKS_FAILED:
            return Object.assign({}, state, {
                tasks: [],
                tasksFailure: true
            });

        default: return state;
    }
};
