console.log('js');

$(document).ready(handleReady);

function handleReady() {
    console.log('jQuery is ready');
    retrieveToDos();
    $('#todo-form').on('click', '#create-task', createToDo);
    $('#display-items').on('click', '.delete-button', deleteToDo);
    $('#display-items').on('click', '.complete-box', toggleComplete);
    $('#display-items').on('click', '.incomplete-box', toggleComplete);
}// end handleReady

function createToDo() {
    console.log('click in createToDo');
    // create new todo template
    let newToDo = {
        name:   $('#task-name').val(),
        section:   $('#task-tag').val(),
        priority:   $('#task-priority').val(),
        deadlineDate:   $('#task-deadline-date').val(),
        deadlineTime:   $('#task-deadline-time').val(),
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
        retrieveToDos();
        // clear inputs
        $('#task-name').val('');
        $('#task-tag').val('');
        $('#task-priority').val('');
        $('#task-deadline-date').val('');
        $('#task-deadline-time').val('');
        $('#task-notes').val('');
    })
    .catch(function(error) {
        console.log('Error in POST: ', error);
    });// end POST
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
        let $tr = '';
        if(toDo.complete === true) {
            $tr = $(`<tr class="checked-box" data-todo-id="${toDo.id}">`);
            } else if(toDo.complete === false) {
                $tr = $(`<tr data-todo-id="${toDo.id}">`);
            }
            $tr.append(`<td>${toDo.name}</td>`);
            $tr.append(`<td>${toDo.section}</td>`);
            $tr.append(`<td class="priority">${toDo.priority}</td>`);
            $tr.append(`<td>${toDo.deadline_date}</td>`);
            $tr.append(`<td>${toDo.deadline_time}</td>`);
            $tr.append(`<td>${toDo.notes}</td>`);
            if(toDo.complete === true) {
                $tr.append(`
                    <td class="mark-box" >
                        <input class="complete-box" type="checkbox" checked >
                        Task complete
                        </td>
                    `);
            } else if(toDo.complete === false) {
                $tr.append(`
                    <td class="mark-box" >
                        <input class="incomplete-box" type="checkbox" >
                        Task pending
                        </td>
                    `);
            }
            $tr.append(`
                    <td class="delete-button">
                        <button class"delete-button-element">DELETE</button>
                        </td>
                        `);
            $tr.append(`</tr>`);
        $('#display-items').append($tr);
    }
}// end displayToDos

function deleteToDo() {
    //event.preventDefault();
    console.log('Click in deleteToDo');
    let todoDelete = $(this).parents().data('todo-id');
    console.log(todoDelete);
    $.ajax({
        type:   'DELETE',
        url:    `/todolist/${todoDelete}`
    })
    .then(function(response) {
        console.log('Response from server: ', response);
        retrieveToDos();
    })
    .catch(function(error) {
        console.log('Error in DELETE: ', error);
        alert('Unable to delete entry at this time. Please try again later');
    });// end DELETE
}// end deleteToDo

function toggleComplete() {
    console.log('Click in toggleComplete');
    let todoID = $(this).parents().parents().data('todo-id');
    console.log(todoID);

    let markTask = {complete: false};

    if( $(this).is(':checked') ) {
        markTask.complete = true;
    } else if( !$(this).is(':checked') ) {
        markTask.complete = false;
    }

    $.ajax({
        type:   'PUT',
        url:    `/todolist/${todoID}`,
        data:   markTask
    })
    .then(function(response) {
        console.log('Back to client from mark_complete: ', response);
        retrieveToDos();
    })
    .catch(function(error) {
        console.log('Error in PUT: ', error);
    });// end PUT
}// end toggleComplete