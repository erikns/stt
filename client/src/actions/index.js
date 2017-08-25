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

export const performLogin = (username, password) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.LOGIN_START
        });

        const loginEndpoint = api.all('login');
        loginEndpoint.post({username: username, password: password})
            .then(response => {
                const tokenEntity = response.body(false);
                console.log(response);
                console.log(tokenEntity);
                dispatch({
                    type: actionTypes.LOGIN_SUCCESS,
                    payload: tokenEntity.token
                })
            })
            .catch(err => {
                console.log('Login error');
                console.log(err);
                dispatch({
                    type: actionTypes.LOGIN_FAILED,
                    payload: {}
                })
            })
    };
}

export const loadPersistedToken = (token) => {
    return (dispatch) => {
        dispatch({type: actionTypes.LOGIN_SUCCESS, payload: token});
    }
}
