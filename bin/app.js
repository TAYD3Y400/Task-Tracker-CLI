const fs = require("fs");
const filePath = "./tasks.json";


function loadTasks(file){
    if (fs.existsSync(file)){
        const data = fs.readFileSync(filePath, "utf-8")
        return JSON.parse(data);
    }
    return []
}

function writeTasks(file, tasks){
    fs.writeFile(file, JSON.stringify(tasks, null, 2), function (err) {
        if (err) throw err;
      });
}

function getNextId(tasks){
    const ids = tasks.map((task) => task.id);
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
}

function findTaskById(id, tasks){
    const task = tasks.find((task) => task.id === parseInt(id));
    if (!task){
        console.log("ERROR: Task ID NOT Found!");
    }
    return task
}

function addTask(taskTitle){
    const tasks = loadTasks(filePath);
    const date = new Date();
    const newTask = { id: getNextId(tasks), taskTitle, completed: false, inProgress: false, createdDate: date, updatedDate: date };
    tasks.push(newTask);
    console.log(`Task id: ${newTask.id},  Title: ${taskTitle},  Created At: ${newTask.createdDate}`);
    writeTasks(filePath, tasks );
}

function updateTask( id, taskTitle){
    const tasks = loadTasks(filePath);
    const task = findTaskById(id, tasks);
    if (task){
        task.taskTitle = taskTitle;
        task.updatedDate = new Date();
        writeTasks(filePath, tasks);
        console.log("Task Succesfully Updated!");
    }
}

function markInProgress(id){
    const tasks = loadTasks(filePath);
    const task = findTaskById(id, tasks);
    if (task){
        task.inProgress = true;
        writeTasks(filePath, tasks);
        console.log("Task Marked as InProgress Succesfully!");
    }
}

function markDone(id){
    const tasks = loadTasks(filePath);
    const task = findTaskById(id, tasks);
    if (task){
        task.inProgress = false;
        task.completed = true;
        writeTasks(filePath, tasks);
        console.log("Task Marked as Done Succesfully!");
    }
}

function deleteTask(id){
    const tasks = loadTasks(filePath);
    const taskDel = findTaskById(id, tasks);
    if (taskDel){
        const newTasks = tasks.filter((task) => task.id !== taskDel.id);
        writeTasks(filePath, newTasks);
        console.log("Task Deleted Succesfully!");
    }
}

function listTasks(status){
    var tasks = loadTasks(filePath);
    switch (status){
        case undefined:
            console.log("List of All Tasks:")
            break;
        case "to-do":
            console.log("List of Tasks to Do:")
            tasks = tasks.filter((task) => (!task.inProgress && !task.completed));
            break;
        case "in-progress":
            console.log("List of Tasks in Progress:")
            tasks = tasks.filter((task) => (task.inProgress));
            break;
        case "done":
            console.log("List of Completed Tasks:")
            tasks = tasks.filter((task) => (task.completed));
            break;
        default:
            tasks = null;
            console.log("Unknown Status. Try again!")
    }
    if (tasks!==null){
        if (tasks.length!==0){
            tasks.forEach((task) => {
                console.log(
                  `${task.id}. ${task.taskTitle} [${task.completed ? "Done" : task.inProgress ? "In-progress" : "To-do"}] Last Update: ${task.updatedDate} Creation Date: ${task.createdDate} `
                );
            });
        } else {
            console.log("No tasks to show. Add tasks with the command: add <task-tittle>")
        }
    }
}

const [,, command, ...args] =  process.argv;
switch (command) {
    case 'add':
        addTask(args[0], args[1]);
        break;
    case 'update':
        updateTask(args[0], args[1]);
        break;
    case 'mark-in-progress':
        markInProgress(args[0]);
        break;
    case 'mark-done':
        markDone(args[0]);
        break;
    case 'delete':
        deleteTask(args[0]);
        break;
    case 'list':
        listTasks(args[0]);
        break;
    default:
        console.log('Unknown command');
}