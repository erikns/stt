import assert from 'assert';
import reducer from './';

function setupNoDone() {
    return {
        tasks: [
            {
                id: 1,
                name: 'Test task',
                done: false
            },
            {
                id: 2,
                name: 'Test task 2',
                done: false
            }
        ],
        hiddenTasks: [],
        hideCompleted: false
    };
}

function setupOneDone() {
    const state = setupNoDone();
    state.tasks[0].done = true;
    return state;
}

describe('done task hiding', () => {
    describe('with no tasks done', () => {
        it('hides no tasks', (done) => {
            const oldState = setupNoDone();
            const newState = reducer(oldState, {type: 'TOGGLE_HIDE_COMPLETED_TASKS'});
            assert.deepEqual(newState.hiddenTasks, []);
            done();
        });
    });

    describe('with one task done', () => {
        it('hides this task', (done) => {
            const oldState = setupOneDone();
            const newState = reducer(oldState, {type: 'TOGGLE_HIDE_COMPLETED_TASKS'});
            assert.deepEqual(newState.hiddenTasks, [1])
            done();
        });

        it('unhides all when toggling back', (done) => {
            const oldState = setupOneDone();
            oldState.hiddenTasks = [1];
            oldState.tasks[1].done = true;
            oldState.hideCompleted = true;
            const newState = reducer(oldState, {type: 'TOGGLE_HIDE_COMPLETED_TASKS'})
            assert.deepEqual(newState.hiddenTasks, []);
            assert.equal(newState.hideCompleted, false);
            done();
        })
    });
});
