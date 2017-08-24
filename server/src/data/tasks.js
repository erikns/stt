const mockTasks = [
    {
        id: 1,
        text: 'Test task 1',
        done: false
    },
    {
        id: 2,
        text: 'Test task 2',
        done: false
    }
]

module.exports = {
    getAllTasks: () => {
        return new Promise((fulfill, reject) => {
            fulfill(mockTasks);
        });
    }
};
