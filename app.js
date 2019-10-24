$(document).ready(function() {
    // This will be executed once the page loads
    const $task = $('#task');
    const $getBtn = $('#getbtn');
    const $username = $('#username');
    const $addBtn = $('#add');
    const $items = $('#items');
    const $saveBtn = $('#save');

    function addItem(itemContent) {
        const $li = $('<li><span>' + itemContent + '</span><button>X</button></li>')
        $li.hide().prependTo($items).fadeIn();
        // $items.append($li);
    }

    $getBtn.on('click', function() {
        $('#items').empty();
        const usernameValue = $username.val();
        $.getJSON(`/todos/${usernameValue}`, function(data, status) {
            // data
            for (var i = 0;i < data.length;i++) {
                addItem(data[i]);
            }
        });
    });

    $addBtn.on('click', function() {
        // executed when add button clicked
        const itemContent = $task.val();
        addItem(itemContent)
        $task.val('');
    });

    $task.on('keydown', function(event) {
        if (event.keyCode === 13)
            $addBtn.click(); // enter pressed
    });

    $items.on('click', 'button', function(event) {
        const $button = $(event.target);
        const $li = $button.parent();
        $li.remove();
    });

    $saveBtn.on('click', function(e) {
        const username = $username.val();
        let items = $('#items > li > span')
        let todoArr = []
        for (let i = 0;i < items.length;i++) {
            let $item = $(items[i]);
            todoArr.push($item.text());
        }
        console.log(todoArr);
        $.ajax({
            url: `/todos/${username}/save`,
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                if(data.success)
                    alert('Saved');
                else
                    alert('Error saving');
            },
            data: JSON.stringify({ array: todoArr})
        });
    });
})