const btnAddTask = document.querySelector(".btn-add-task");
const inputAddTask = document.querySelector(".input-add-task");
const listTasks = document.querySelector(".list-tasks");
let tasks = [];

function addNewTask() {
    if (inputAddTask.value === '') {
        alert("Você não pode adicionar uma tarefa vazia. Informe uma descrição de tarefa.")
    } else {
        tasks.push({
            description: inputAddTask.value,
            completed: false,
        });
    }

    inputAddTask.value = '';
    showTasks();
}

function showTasks() {
    let taskItems = "";
    tasks.forEach((task, index) => {
        taskItems += `
        <li class="task ${task.completed && "done"}">
            <img src="./img/check-icon.png" alt="checked-icon" class="img-task-action ${task.completed && "done"}" onclick="completeTask(${index})"/>
            <p>${task.description}</p>
            <img src="./img/trash-icon.png" alt="delete-tarefa" class="img-task-action" onclick="deleteItem(${index})"/>
        </li>`
    });

    listTasks.innerHTML = taskItems;

    localStorage.setItem('listaDeTarefas', JSON.stringify(tasks));

}

function deleteItem(index) {
    let response = confirm(`Deseja realmente excluir a tarefa "${tasks[index].description}"?`);
    if (response) {
        tasks.splice(index, 1);
        showTasks();
    }
}

function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;
    showTasks();
}

function reloadTaskItems() {
    const localStorageTasks = localStorage.getItem('listaDeTarefas');
    if (localStorageTasks) {
        tasks = JSON.parse(localStorageTasks);
    }
    showTasks();
}


reloadTaskItems();
btnAddTask.addEventListener("click", addNewTask);