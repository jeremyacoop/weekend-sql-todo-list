console.log('js');

$(document).ready(handleReady);

function handleReady() {
    console.log('jQuery is ready');
    retrieveToDos();
    $('#todo-form').on('click', '#create-task', createToDo);
    }// end handleReady

function createToDo() {
    console.log('click in createToDo');
    // create new todo template
    let newToDo = {
        name:   $('#task-name').val(),
        type:   $('#task-type').val(),
        notes:  $('#task-notes').val()
    }
    console.log(newToDo);

    $.ajax({
        type:    'POST',
        url:     '/todolist',
        data:    newToDo
    })
    .then(function(response) {
        console.log('Response from server: ', response);
    })
    .catch(function(error) {
        console.log('Error in POST: ', error);
    });
}// end createToDo

function retrieveToDos() {
    console.log('In retrieveToDos');
    $.ajax({
        type:   'GET',
        url:    '/todolist'
    })
    .then(function(response) {
        console.log(response);
        displayToDos(response);
    })
    .catch(function(error) {
        console.log('Error in GET ', error);
    });// end GET
}// end retrieveToDos