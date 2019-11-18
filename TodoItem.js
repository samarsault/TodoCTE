const mongoose = require('mongoose');

const TodoItemSchema = new mongoose.Schema({
    item: String,
    username: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('TodoItem', TodoItemSchema);