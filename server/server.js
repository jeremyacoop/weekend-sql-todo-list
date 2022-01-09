const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/todos.router');

const app = express();
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/todolist', router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('server up on port', port);
    });

