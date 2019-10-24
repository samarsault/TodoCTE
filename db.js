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
    save: function(username, todoArr, callBack) {
        fs.readFile('./data.json', 'utf-8', function(err, dataStr) {
            let data = JSON.parse(dataStr);
            data[username] = todoArr;
            let str = JSON.stringify(data)
            fs.writeFile('./data.json', str, function(err) {
                if (!err)
                    callBack(false);
                else
                    callBack(true);
            })
        })
    }
}

module.exports = DB;