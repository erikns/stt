import actionTypes from '../actionTypes';

const initialState = {
    tasks: [],
    tasksFailure: false,
    session: {
        loggedIn: false,
        token: null
    }
}

export default (state = initialState, action) => {
    console.log('State:');
    console.log(state);
    console.log('action');
    console.log(action.type);
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

        case actionTypes.LOGIN_START:
            return state;

        case actionTypes.LOGIN_SUCCESS:
            sessionStorage.setItem('tasksAppToken', action.payload);
            return Object.assign({}, state, {
                session: {
                    loggedIn: true,
                    token: action.payload
                }
            });

        case actionTypes.LOGIN_FAILED:
            return state;

        default: return state;
    }
};
