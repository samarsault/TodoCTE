$(document).ready(function() {
    // This will be executed once the page loads
    const $task = $('#task');
    const $getBtn = $('#getbtn');
    const $username = $('#username');
    const $addBtn = $('#add');
    const $items = $('#items');

    function addItem(itemContent) {
        const $li = $('<li><span>' + itemContent + '</span><button>X</button></li>')
        $li.hide().prependTo($items).fadeIn();
        // $items.append($li);
    }

    $getBtn.on('click', function() {
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
})