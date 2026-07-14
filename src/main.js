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


import {
    renderTaskList,
    renderStats
} from './views/taskView';



let tasks = [];
let currentFilter = 'all';



window.onload = function () {


    tasks = loadTasks();


    document
        .getElementById('addBtn')
        .onclick = addTask;


    document
        .getElementById('taskInput')
        .onkeypress = function (event) {

            if (event.key === 'Enter') {
                addTask();
            }

        };


    document
        .querySelectorAll('.filter-btn')
        .forEach(button => {

            button.onclick = function () {

                changeFilter(
                    this.dataset.filter
                );

            };

        });



    updateView();

};



function addTask() {

    const input =
        document.getElementById('taskInput');


    const text =
        input.value.trim();



    if (!text) {

        alert('Por favor escribe una tarea');
        return;

    }



    const task =
        createTask(
            text,
            getNextTaskId(tasks)
        );



    tasks.push(task);


    saveTasks(tasks);


    input.value = '';


    updateView();

}



function updateTask(id) {

    tasks =
        toggleTask(tasks, id);


    saveTasks(tasks);


    updateView();

}



function removeTask(id) {

    tasks =
        deleteTask(tasks, id);


    saveTasks(tasks);


    updateView();

}



function changeFilter(filter) {

    currentFilter = filter;


    document
        .querySelectorAll('.filter-btn')
        .forEach(button => {

            button.classList.remove('active');

        });



    const activeButton =
        document.querySelector(
            `[data-filter="${filter}"]`
        );


    if (activeButton) {

        activeButton.classList.add('active');

    }



    updateView();

}



function updateView() {


    const filteredTasks =
        filterTasks(
            tasks,
            currentFilter
        );



    renderTaskList(
        filteredTasks,
        document.getElementById('taskList'),
        {
            onToggle: updateTask,
            onDelete: removeTask
        }
    );



    renderStats(
        getTaskStats(tasks),
        document.getElementById('stats')
    );

}