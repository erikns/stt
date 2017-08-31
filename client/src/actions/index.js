import restful, { fetchBackend } from 'restful.js';

import actionTypes from '../actionTypes';

const api = restful('http://localhost:3001', fetchBackend(fetch));

api.addRequestInterceptor(config => {
    const { headers } = config;
    const token = sessionStorage.getItem('tasksAppToken');
    console.log('API CALL with token: ' + token);
    if (token) {
        headers.Authorization = sessionStorage.getItem('tasksAppToken');
    }
    return { headers };
})

export const getAllTasks = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_TASKS_START
        });

        api.all('tasks').getAll().then(response => {
            console.log('TASKS OK');
            const tasksCollection = response.body(false);
            console.log(tasksCollection);

            dispatch({
                type: actionTypes.GET_ALL_TASKS_SUCCESS,
                payload: tasksCollection
            });
        }).catch(error => {
            console.log(error);
            dispatch({
                type: actionTypes.GET_ALL_TASKS_FAILED,
                payload: error
            })
        });

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
                    payload: err
                });
            })
    };
}

export const loadPersistedToken = (token) => {
    return (dispatch) => {
        dispatch({type: actionTypes.LOGIN_SUCCESS, payload: token});
    }
}
