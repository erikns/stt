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
            type: 'GET_ALL_TASKS_START'
        });
        dispatch({
            type: 'GET_ALL_TASKS_SUCCESS',
            payload: mockTodos
        });
    };
}
