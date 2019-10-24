const express = require('express');
const bodyParser = require('body-parser');
const DB = require('./db');
const app = express();

app.use(bodyParser.json());
app.use(express.static('.'));

app.get('/todos/:username', function(req, res) {
    const username = req.params.username;
    DB.get(username, function(err, todoData) {
        if (!err)
            res.json(todoData);
        else
            res.send('Not found');
    })
});

app.post('/todos/:username/save', function(req, res) {
    const data = req.body.array, username = req.params.username;
    DB.save(username, data, function (err) {
        if (!err)
            res.json({ success: true })
        else
            res.json({ success: false })
    })
});

app.listen(8000);