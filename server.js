const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const DB = require('./db');
const app = express();
const TodoItem = require('./TodoItem');

const databaseName = 'todoApp';
const dbURL = `mongodb://localhost:27017/${databaseName}`
mongoose.connect(dbURL, { useNewUrlParser: true })

app.use(bodyParser.json());
app.use(express.static('.'));

app.get('/todos/:username', async function(req, res) {
    const username = req.params.username;
    const items = await TodoItem.find({
        username: username
    });

    itemStr = items.map(obj => obj.item);
    // console.log(itemStr)
    return res.send(itemStr);
});

app.post('/todos/:username/save', async function(req, res) {
    const data = req.body.array, username = req.params.username;
    await TodoItem.deleteMany({ username: username })
    for (let i = 0;i < data.length;i++) {
        const MyItem = new TodoItem({
            item: data[i],
            username: username  
        })
        await MyItem.save()
    }
    return res.json({
        success: true
    });
});

app.listen(8000);