const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let tasks = [];

// load tasks at start
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
    renderTasks();
  }
});

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item";
    li.dataset.id = task.id;

    const span = document.createElement("span");
    span.className = "task-text";
    if (task.done) span.classList.add("done");
    span.textContent = task.text;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.textContent = task.done ? "Undo" : "Done";

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "✕";

    actions.appendChild(toggleBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

// add task
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({
    id: Date.now(),
    text,
    done: false,
  });

  taskInput.value = "";
  saveTasks();
  renderTasks();
});

// handle clicks on list (toggle / delete)
taskList.addEventListener("click", (e) => {
  const li = e.target.closest(".task-item");
  if (!li) return;
  const id = Number(li.dataset.id);

  if (e.target.textContent === "Done" || e.target.textContent === "Undo") {
    tasks = tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    saveTasks();
    renderTasks();
  }

  if (e.target.textContent === "✕") {
    tasks = tasks.filter((t) => t.id !== id);
    saveTasks();
    renderTasks();
  }
});
