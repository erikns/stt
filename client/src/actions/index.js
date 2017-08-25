import actionTypes from '../actionTypes';

const mockTodos = [
    {
        id: 1,
        name: 'Test task',
        done: false
    }
];

export const getAllTasks = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_TASKS_START
        });
        dispatch({
            type: actionTypes.GET_ALL_TASKS_SUCCESS,
            payload: mockTodos
        });
    };
}
