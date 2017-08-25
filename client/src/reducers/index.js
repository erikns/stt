import actionTypes from '../actionTypes';

const initialState = {
    tasks: []
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
        default: return state;
    }
};
