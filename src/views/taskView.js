export function renderTaskList(tasks, container, handlers) {

    container.innerHTML = '';


    tasks.forEach(task => {

        const taskDiv = document.createElement('div');

        taskDiv.className = task.completed
            ? 'task-item completed'
            : 'task-item';


        taskDiv.innerHTML = `

            <span>${task.text}</span>

            <div class="task-buttons">

                <button class="complete-btn">
                    ${task.completed ? 'Reactivar' : 'Completar'}
                </button>

                <button class="delete-btn">
                    Eliminar
                </button>

            </div>

        `;


        const completeButton =
            taskDiv.querySelector('.complete-btn');


        const deleteButton =
            taskDiv.querySelector('.delete-btn');


        completeButton.onclick = function () {
            handlers.onToggle(task.id);
        };


        deleteButton.onclick = function () {
            handlers.onDelete(task.id);
        };


        container.appendChild(taskDiv);

    });


    if (tasks.length === 0) {

        container.innerHTML =
            '<p style="text-align:center;color:#999;padding:20px;">No hay tareas para mostrar</p>';

    }

}



export function renderStats(stats, element) {

    element.innerHTML =
        `Total: ${stats.total} |
         Completadas: ${stats.completed} |
         Activas: ${stats.active}`;

}