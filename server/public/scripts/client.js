console.log('js');

$(document).ready(handleReady);

function handleReady() {
    console.log('jQuery is ready');
    $('#todo-form').on('click', '#create-task', createToDo);
    }

function createToDo() {
    console.log('click in createToDo');
    let newToDo = {
        name:   $('#task-name').val(),
        type:   $('#task-type').val(),
        notes:  $('#task-notes').val()
    }
    console.log(newToDo);
}