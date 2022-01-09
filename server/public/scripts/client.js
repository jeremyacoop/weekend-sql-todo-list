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
        let $tr = $(`<tr data-todo-id="${toDo.id}">`);
            $tr.append(`<td>${toDo.name}</td>`);
            $tr.append(`<td>${toDo.section}</td>`);
            $tr.append(`<td>${toDo.notes}</td>`);
            $tr.append(`<td><button class+"delete-button">DELETE</button></td>`);
            $tr.append(`</tr>`);
        $('#display-items').append($tr);
    }
    console.log(todoItems[5].section);
}// end displayToDos