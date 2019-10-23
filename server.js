const express = require('express');
const DB = require('./db');
const app = express();

app.use(express.static('.'));

app.get('/todos/:username', function(req, res) {
    const username = req.params.username;
    DB.get(username, function(err, todoData) {
        if (!err)
            res.json(todoData);
        else
            res.send('Not found');
    })
})

app.listen(8000);