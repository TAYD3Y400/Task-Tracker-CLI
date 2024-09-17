# Task-Tracker-CLI

Challenge form https://roadmap.sh/projects/task-tracker. 

A JavaScript and Node.js project that creates a CLI (Command Line Interface) to track daily tasks. In this project, tasks can be added, read, updated, and deleted, as well as filtered by their status. Tasks are saved along with their respective changes in a JSON file specified in /bin/app.js as the filepath.

## Prerrequisites

Have node.js intalled.

## Features

- Add new tasks with a unique ID and store it in `JSON` format.
- List tasks by their status: `to-do`, `in-progress`, or `done`.
- Update the description of an existing task.
- Delete tasks by their ID.
- Mark tasks as `in-progress` or `done`.

## Usage

- **Add a Task**
```bash
node .\bin\app.js add "Task"
```

- **Update a Task**
```bash
# Update the task by id
node .\bin\app.js update <id> "Drink a Coffee and Do Coding"
```

- **Delete a Task**
```bash
# Delete the task by id
node index.js delete <id>
```

- **Mark Task Status**
```bash
# Mark as `in-progress` with containing task ID 
node .\bin\app.js mark-in-progress <id>

# Mark as `done` with containing task ID 
node .\bin\app.js  mark-done <id>
```

- **List all Tasks**
```bash
node .\bin\app.js list
```
- **List the tasks by status**
```bash
# To list the tasks that are marked as to-do
node .\bin\app.js list to-do

# To list the tasks that are marked as in-progess
node .\bin\app.js list in-progress

# To list the tasks that are marked as done
node .\bin\app.js list done
```
