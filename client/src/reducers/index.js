import actionTypes from '../actionTypes';

const initialState = {
    tasks: [],
    tasksFailure: false,
    hideCompleted: false,
    session: {
        loggedIn: false,
        token: null,
        loginFailure: false
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
            console.log('Login failed!!!');
            return Object.assign({}, state, {
                session: {
                    loggedIn: false,
                    loginFailure: true
                }
            });

        case actionTypes.MARK_TASK_DONE_START:
            return state;

        case actionTypes.MARK_TASK_DONE_SUCCESS:
            const idx = state.tasks.findIndex(e => e.id === action.payload.id);
            console.log('Task idx: ' + idx);
            return Object.assign({}, state, {
                tasks: updateObjectInArray(state.tasks, {index: idx, item: action.payload})
            });

        case actionTypes.UPDATE_TASK_SUCCESS:
            const idx2 = state.tasks.findIndex(e => e.id === action.payload.id);
            return Object.assign({}, state, {
                tasks: updateObjectInArray(state.tasks, {index: idx2, item: action.payload})
            });

        case actionTypes.TOGGLE_HIDE_COMPLETED_TASKS:
            return Object.assign({}, state, {
                hideCompleted: !state.hideCompleted
            });

        default: return state;
    }
};

function updateObjectInArray(array, action) {
    return array.map( (item, index) => {
        if(index !== action.index) {
            // This isn't the item we care about - keep it as-is
            return item;
        }

        // Otherwise, this is the one we want - return an updated value
        return {
            ...item,
            ...action.item
        };
    });
}
