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

export const markTaskDone = (id, done) => {
    return (dispatch) => {
        console.log('Marked done ' + id + ' ' + done)
        dispatch({
            type: actionTypes.MARK_TASK_DONE_START
        });

        api.one('tasks', id).patch({done: done}).then(response => {
            const updatedTask = response.body(false);
            dispatch({
                type: actionTypes.MARK_TASK_DONE_SUCCESS,
                payload: updatedTask
            });
        }).catch(error => {
            dispatch({
                type: actionTypes.MARK_TASK_DONE_FAILED,
                payload: error
            });
        });
    };
}

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

export const deleteTask = (id) => {
    return (dispatch) => {
        console.log('deleteTask action id: ' + id);
        dispatch({
            type: actionTypes.DELETE_TASK_START
        });

        api.one('tasks', id).delete().then(response => {
            dispatch({
                type: actionTypes.DELETE_TASK_SUCCESS
            });
            dispatch(getAllTasks()); // get all tasks fresh when deleting
        }).catch(err => {
            dispatch({
                type: actionTypes.DELETE_TASK_FAILED
            });
        });
    }
}

export const updateTask = (id, txt) => {
    return (dispatch) => {
        console.log('update task ' + id + ' to ' + txt);
        dispatch({
            type: actionTypes.UPDATE_TASK_START
        });

        api.one('tasks', id).patch({name: txt}).then(response => {
            dispatch({
                type: actionTypes.UPDATE_TASK_SUCCESS,
                payload: response.body()
            });
            dispatch(getAllTasks());
        }).catch(error => {
            dispatch({
                type: actionTypes.UPDATE_TASK_FAILED,
                payload: error
            });
        })
    };
}

export const addTask = (txt) => {
    return (dispatch) => {
        console.log('Adding task: ' + txt);
        dispatch({
            type: actionTypes.ADD_TASK_START
        })

        api.all('tasks').post({
            done: false,
            name: txt
        }).then(response => {
            dispatch({
                type: actionTypes.ADD_TASK_SUCCESS,
                payload: response.body(false)
            });
            dispatch(getAllTasks());
        }).catch(error => {
            dispatch({
                type: actionTypes.ADD_TASK_FAILED,
                payload: error
            });
        });
    }
}

export const toggleHideCompletedTasks = () => {
    return (dispatch) => {
        console.log('Toggle hide completed action');
        dispatch({type: actionTypes.TOGGLE_HIDE_COMPLETED_TASKS});
    }
}

export const loadPersistedToken = (token) => {
    return (dispatch) => {
        dispatch({type: actionTypes.LOGIN_SUCCESS, payload: token});
    }
}

export default {
    markTaskDone: markTaskDone,
    getAllTasks: getAllTasks,
    performLogin: performLogin,
    deleteTask: deleteTask,
    addTask: addTask,
    toggleHideCompletedTasks: toggleHideCompletedTasks,
    loadPersistedToken: loadPersistedToken,
    updateTask: updateTask
};
