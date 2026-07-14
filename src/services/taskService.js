export function createTask(text, id) {
    return {
        id,
        text,
        completed: false,
        createdAt: new Date().toISOString()
    };
}

export function getNextTaskId(tasks) {
    return tasks.length > 0
        ? Math.max(...tasks.map(task => task.id)) + 1
        : 1;
}

export function toggleTask(tasks, id) {
    return tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    );
}

export function deleteTask(tasks, id) {
    return tasks.filter(task => task.id !== id);
}

export function filterTasks(tasks, filter) {

    if (filter === 'active') {
        return tasks.filter(task => !task.completed);
    }

    if (filter === 'completed') {
        return tasks.filter(task => task.completed);
    }

    return tasks;
}

export function getTaskStats(tasks) {

    const completed = tasks.filter(task => task.completed).length;

    return {
        total: tasks.length,
        completed,
        active: tasks.length - completed
    };
}