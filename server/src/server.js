const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(3001, () => {
    console.log('Server side app listening on port 3001');
})
