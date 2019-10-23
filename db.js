const fs = require('fs');
const DB = {
    get: function(username, callBack) {
        fs.readFile('./data.json', 'utf-8', function(err, str) {
            const data = JSON.parse(str);
            const userTodoArray = data[username];
            if (userTodoArray) {
                callBack(false, userTodoArray)
            } else {
                callBack(true, []);
            }
        });
    },
    save: function(username) {

    }
}

module.exports = DB;