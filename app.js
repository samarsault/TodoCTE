$(document).ready(function() {
    // This will be executed once the page loads
    const $task = $('#task');
    const $addBtn = $('#add');
    const $items = $('#items');

    $addBtn.on('click', function() {
        // executed when add button clicked
        const itemContent = $task.val();
        const $li = $('<li><span>' + itemContent + '</span><button>X</button></li>')
        $li.hide().prependTo($items).fadeIn();
        // $items.append($li);
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