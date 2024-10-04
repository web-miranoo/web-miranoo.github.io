const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");

const sampleData = [
  {
    text: "Complete project documentation",
    completed: false,
    subtasks: ["Write user guide", "Update API references"]
  },
  {
    text: "Design new homepage layout",
    completed: true,
    subtasks: ["Create wireframes", "Review design with team"]
  },
  {
    text: "Prepare for client meeting",
    completed: false,
    subtasks: ["Create presentation", "Send meeting agenda"]
  }
];

function renderSampleData() {
  sampleData.forEach((task) => {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    if (task.completed) {
      todoItem.classList.add("completed");
    }
    todoItem.innerHTML = `
        <span>${task.text}</span>
        <div class="task-actions">
          <button class="icon-btn complete-btn">✔️</button>
          <button class="icon-btn subtask-btn">➕</button>
          <button class="icon-btn delete-btn">❌</button>
        </div>
        <ul class="subtasks"></ul>
      `;

    const subtaskList = todoItem.querySelector(".subtasks");
    task.subtasks.forEach((subtask) => {
      const subtaskItem = document.createElement("li");
      subtaskItem.textContent = subtask;
      subtaskList.appendChild(subtaskItem);
    });
    // Event listeners for task actions
    todoItem
      .querySelector(".complete-btn")
      .addEventListener("click", () => toggleComplete(todoItem));
    todoItem
      .querySelector(".delete-btn")
      .addEventListener("click", () => deleteTodoItem(todoItem));
    todoItem
      .querySelector(".subtask-btn")
      .addEventListener("click", () => addSubtask(todoItem));
    todoList.appendChild(todoItem);
  });
}

addTodoBtn.addEventListener("click", addTodo);

function addTodo() {
  const taskText = todoInput.value.trim();
  if (taskText !== "") {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.innerHTML = `
        <span>${taskText}</span>
        <div class="task-actions">
          <button class="icon-btn complete-btn">✔️</button>
          <button class="icon-btn subtask-btn">➕</button>
          <button class="icon-btn delete-btn">❌</button>
        </div>
        <ul class="subtasks"></ul>
      `;

    todoItem
      .querySelector(".complete-btn")
      .addEventListener("click", () => toggleComplete(todoItem));
    todoItem
      .querySelector(".delete-btn")
      .addEventListener("click", () => deleteTodoItem(todoItem));
    todoItem
      .querySelector(".subtask-btn")
      .addEventListener("click", () => addSubtask(todoItem));
    todoList.appendChild(todoItem);
    todoInput.value = "";
  }
}

function toggleComplete(todoItem) {
  todoItem.classList.toggle("completed");
}

function deleteTodoItem(todoItem) {
  todoItem.remove();
}

function addSubtask(todoItem) {
  const subtaskText = prompt("Enter subtask:");
  if (subtaskText) {
    const subtaskList = todoItem.querySelector(".subtasks");
    const subtaskItem = document.createElement("li");
    subtaskItem.textContent = subtaskText;
    subtaskList.appendChild(subtaskItem);
  }
}

window.onload = renderSampleData;
