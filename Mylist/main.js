// Get elements from the DOM
const todoInput = document.querySelector(".todo-input");
const addButton = document.querySelector(".add-button");
const todoList = document.querySelector(".todo-list");
const completedTasksButton = document.querySelector(".completed-tasks-button");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");
const completedTasksList = document.querySelector(".completed-tasks-list");
const backupButton = document.querySelector(".backup-button");
const restoreButton = document.querySelector(".restore-button");

let completedTasks = [];

// Function to create a new todo item
function createTodoItem(task) {
	const li = document.createElement("li");
	li.classList.add("todo-item");
	li.innerHTML = `
        <span class="task-text">${task}</span>
        <button class="delete-button"><i class="fas fa-trash"></i></button>
    `;

	// Add click event for completing the task
	li.addEventListener("click", (e) => {
		if (
			!e.target.classList.contains("delete-button") &&
			!e.target.closest(".delete-button")
		) {
			markAsComplete(task, li);
		}
	});

	// Add hover event for delete button
	const deleteButton = li.querySelector(".delete-button");
	deleteButton.addEventListener("click", (e) => {
		e.stopPropagation(); // Prevent task completion when delete button is clicked
		deleteTask(li);
	});

	todoList.appendChild(li);
}

// Function to add a new task
function addTask() {
	const task = todoInput.value.trim();
	if (task) {
		createTodoItem(task);
		todoInput.value = ""; // Clear input after adding
		saveTasks();
	}
}

// Function to mark a task as complete and remove it from the list
function markAsComplete(task, taskElement) {
	completedTasks.push(task);
	taskElement.remove();
	saveTasks();
}

// Function to delete a task
function deleteTask(taskElement) {
	taskElement.remove();
	saveTasks();
}

// Add event listener to the "Add" button
addButton.addEventListener("click", addTask);

// Add event listener for pressing 'Enter' key in the input field
todoInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		addTask();
	}
});

// Show completed tasks in a modal
completedTasksButton.addEventListener("click", () => {
	// Clear the completed tasks list first
	completedTasksList.innerHTML = "";

	// Add completed tasks to the modal list
	completedTasks.forEach((task) => {
		const li = document.createElement("li");
		li.classList.add("completed-task-item");
		li.innerHTML = `
            <span class="task-text">${task}</span>
            <button class="delete-button"><i class="fas fa-trash"></i></button>
        `;

		// Add hover event for delete button in modal
		const deleteButton = li.querySelector(".delete-button");
		deleteButton.addEventListener("click", (e) => {
			e.stopPropagation();
			deleteCompletedTask(task, li);
		});

		completedTasksList.appendChild(li);
	});

	// Show the modal
	modal.style.display = "block";
});

// Close the modal
closeButton.addEventListener("click", () => {
	modal.style.display = "none";
});

// Function to delete a task from the completed tasks list
function deleteCompletedTask(task, taskElement) {
	completedTasks = completedTasks.filter((t) => t !== task);
	taskElement.remove();
	saveTasks();
}

// Close modal when clicking outside the content
window.addEventListener("click", (e) => {
	if (e.target === modal) {
		modal.style.display = "none";
	}
});

// Function to save tasks to local storage
function saveTasks() {
	const tasks = Array.from(todoList.children).map(
		(li) => li.querySelector(".task-text").innerText
	);
	localStorage.setItem("tasks", JSON.stringify(tasks));
	localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

// Function to load tasks from local storage
function loadTasks() {
	const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
	const completedTasksFromStorage =
		JSON.parse(localStorage.getItem("completedTasks")) || [];

	// Load tasks
	tasks.forEach((task) => createTodoItem(task));

	// Load completed tasks
	completedTasks = completedTasksFromStorage;
}

// Load tasks when the page is loaded
window.addEventListener("load", loadTasks);

// Function to backup tasks to a JSON file
function backupTasks() {
	const tasks = Array.from(todoList.children).map(
		(li) => li.querySelector(".task-text").innerText
	);
	const backupData = {
		tasks: tasks,
		completedTasks: completedTasks
	};

	const blob = new Blob([JSON.stringify(backupData, null, 2)], {
		type: "application/json"
	});
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "todo_backup.json";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

// Function to restore tasks from a JSON file
function restoreTasks() {
	const input = document.createElement("input");
	input.type = "file";
	input.accept = "application/json";
	input.onchange = (event) => {
		const file = event.target.files[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const backupData = JSON.parse(e.target.result);
				const { tasks, completedTasks: restoredCompletedTasks } = backupData;

				// Clear current tasks and completed tasks
				todoList.innerHTML = "";
				completedTasks = [];

				// Restore tasks
				tasks.forEach((task) => createTodoItem(task));
				completedTasks = restoredCompletedTasks;

				saveTasks(); // Save restored tasks to local storage
				alert("Tasks restored successfully!");
			} catch (error) {
				alert("Invalid backup file.");
			}
		};
		reader.readAsText(file);
	};
	input.click();
}

// Add event listeners for the backup and restore buttons
backupButton.addEventListener("click", backupTasks);
restoreButton.addEventListener("click", restoreTasks);
