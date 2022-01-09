console.log('js');

$(document).ready(handleReady);

function handleReady() {
    console.log('jQuery is ready');
    retrieveToDos();
    $('#todo-form').on('click', '#create-task', createToDo);
    $('#display-items').on('click', '.delete-button', 
    //$('tr.todo-id').on('click', '.delete-button', function() {
    deleteToDo)
}// end handleReady

function createToDo() {
    console.log('click in createToDo');
    // create new todo template
    let newToDo = {
        name:   $('#task-name').val(),
        section:   $('#task-tag').val(),
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
    });// end POST
    retrieveToDos();
    // clear inputs
    $('#task-name').val('');
    $('#task-type').val('');
    $('#task-notes').val('');
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

function displayToDos(todoItems) {
    console.log('In displayToDos');
    $('#display-items').empty();
    console.log(todoItems);
    for(i=0; i<todoItems.length; i++) {
        let toDo = todoItems[i];
            $('#display-items').append(`
            <tr data-todo-id="${toDo.id}">
                <td>${toDo.name}</td>
                <td>${toDo.section}</td>
                <td>${toDo.notes}</td>
                <td class="delete-button"><button>DELETE</button></td>
            </tr>`);
    }
    console.log(todoItems[5].section);
}// end displayToDos

function deleteToDo() {
    //event.preventDefault();
    console.log('Click in deleteToDo');
    let todoDelete = $(this).parents().data('todo-id');
    console.log(todoDelete);
}