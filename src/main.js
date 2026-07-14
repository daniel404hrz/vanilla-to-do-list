import './style.css';

import { loadTasks, saveTasks } from './services/storageService';

import {
    createTask,
    getNextTaskId,
    toggleTask,
    deleteTask,
    filterTasks,
    getTaskStats
} from './services/taskService';


let tasks = [];
let currentFilter = 'all';


window.onload = function () {

    tasks = loadTasks();

    document.getElementById('addBtn').onclick = addTask;

    document
        .getElementById('taskInput')
        .onkeypress = function (event) {

            if (event.key === 'Enter') {
                addTask();
            }

        };


    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {

        button.onclick = function () {
            filterTasksView(
                this.getAttribute('data-filter')
            );
        };

    });


    renderTasks();
    updateStats();

};



function addTask() {

    const input = document.getElementById('taskInput');

    const text = input.value.trim();


    if (!text) {
        alert('Por favor escribe una tarea');
        return;
    }


    const newTask = createTask(
        text,
        getNextTaskId(tasks)
    );


    tasks.push(newTask);

    saveTasks(tasks);


    input.value = '';

    renderTasks();
    updateStats();

}



function renderTasks() {

    const taskList = document.getElementById('taskList');

    taskList.innerHTML = '';


    const visibleTasks = filterTasks(
        tasks,
        currentFilter
    );


    visibleTasks.forEach(task => {


        const taskDiv = document.createElement('div');


        taskDiv.className = task.completed
            ? 'task-item completed'
            : 'task-item';


        taskDiv.innerHTML = `

            <span>${task.text}</span>

            <div class="task-buttons">

                <button class="complete-btn" data-id="${task.id}">
                    ${task.completed ? 'Reactivar' : 'Completar'}
                </button>


                <button class="delete-btn" data-id="${task.id}">
                    Eliminar
                </button>

            </div>

        `;


        taskDiv
            .querySelector('.complete-btn')
            .onclick = function () {

                updateTaskStatus(
                    Number(this.dataset.id)
                );

            };


        taskDiv
            .querySelector('.delete-btn')
            .onclick = function () {

                removeTask(
                    Number(this.dataset.id)
                );

            };


        taskList.appendChild(taskDiv);


    });


    if (visibleTasks.length === 0) {

        taskList.innerHTML =
            '<p style="text-align:center;color:#999;padding:20px;">No hay tareas para mostrar</p>';

    }

}



function updateTaskStatus(id) {

    tasks = toggleTask(tasks, id);

    saveTasks(tasks);

    renderTasks();

    updateStats();

}



function removeTask(id) {

    tasks = deleteTask(tasks, id);

    saveTasks(tasks);

    renderTasks();

    updateStats();

}



function filterTasksView(filter) {

    currentFilter = filter;


    document
        .querySelectorAll('.filter-btn')
        .forEach(button => {

            button.classList.remove('active');

        });


    const selectedButton =
        document.querySelector(
            `[data-filter="${filter}"]`
        );


    if (selectedButton) {
        selectedButton.classList.add('active');
    }


    renderTasks();

}



function updateStats() {

    const stats = getTaskStats(tasks);


    document.getElementById('stats').innerHTML =

        `Total: ${stats.total} | 
        Completadas: ${stats.completed} | 
        Activas: ${stats.active}`;

}