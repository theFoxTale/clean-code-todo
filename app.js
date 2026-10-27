const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTasksList = document.getElementById('incompleteTasks');
const completedTasksList = document.getElementById('completed-tasks');

const createDeleteButton = function () {
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';

    const deleteIcon = document.createElement('img');
    deleteIcon.src = './remove.svg';
    deleteButton.appendChild(deleteIcon);

    return deleteButton;
};

const createNewTaskElement = function (taskText) {
    const listItem = document.createElement('li');

    const checkBox = document.createElement('input');
    const label = document.createElement('label');
    const editInput = document.createElement('input');
    const editButton = document.createElement('button');

    const deleteButton = createDeleteButton();

    label.innerText = taskText;
    label.className = 'task';

    checkBox.type = 'checkbox';
    editInput.type = 'text';
    editInput.className = 'task';

    // innerText вставляет текст как есть и экранирует спецсимволы
    // в отличие от innerHTML, который интерпретирует их как разметку.
    editButton.innerText = 'Edit';
    editButton.className = 'edit';

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
};

const addTask = function () {
    if (!taskInput.value) return;
    const listItem = createNewTaskElement(taskInput.value);

    incompleteTasksList.appendChild(listItem);
    bindTaskEvents(listItem, toggleTaskState);

    taskInput.value = '';
};

const editTask = function () {
    const listItem = this.parentNode;

    const editInput = listItem.querySelector('input[type=text]');
    const label = listItem.querySelector('label');
    const editButton = listItem.querySelector('.edit');
    const isEditMode = listItem.classList.contains('edit-mode');

    if (isEditMode) {
        label.innerText = editInput.value;
        editButton.innerText = 'Edit';
    } else {
        editInput.value = label.innerText;
        editButton.innerText = 'Save';
    }

    listItem.classList.toggle('edit-mode');
};

const deleteTask = function () {
    const listItem = this.parentNode;
    const list = listItem.parentNode;
    list.removeChild(listItem);
};

const toggleTaskState = function () {
    const listItem = this.parentNode;
    const targetList = this.checked ? completedTasksList : incompleteTasksList;
    targetList.appendChild(listItem);
    bindTaskEvents(listItem, toggleTaskState);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    const checkBox = taskListItem.querySelector('input[type=checkbox]');
    const editButton = taskListItem.querySelector('button.edit');
    const deleteButton = taskListItem.querySelector('button.delete');

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
};

const bindTaskEventsToAllItems = function (taskList) {
    for (let i = 0; i < taskList.children.length; i++) {
        bindTaskEvents(taskList.children[i], toggleTaskState);
    }
};

bindTaskEventsToAllItems(incompleteTasksList);
bindTaskEventsToAllItems(completedTasksList);
