import restful, { fetchBackend } from 'restful.js';

import actionTypes from '../actionTypes';

const api = restful('http://localhost:3001', fetchBackend(fetch));

export const getAllTasks = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_TASKS_START
        });

        const tasksCollection = api.all('tasks').getAll().then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
            dispatch({
                type: actionTypes.GET_ALL_TASKS_FAILED
            })
        });
        console.log(tasksCollection);

        /*
        dispatch({
            type: actionTypes.GET_ALL_TASKS_SUCCESS,
            payload: mockTodos
        });*/
    };
}
