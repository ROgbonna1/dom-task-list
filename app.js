// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load Event Listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add Task Event
  form.addEventListener('submit', addTask);
  // Delete Task
  taskList.addEventListener('click', deleteTask);
  // Clear Task List
  clearBtn.addEventListener('click', clearTaskList);
  // Filter Tasks
  filter.addEventListener('keyup', filterTasks);
}

function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(task => {
    // Create li element
    const li = document.createElement('li');
    // Add Class
    li.className = 'collection-item';
    // Create Text Node and append to li
    li.appendChild(document.createTextNode(task));
    // Create New Link Element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // Add icon HTML
    link.innerHTML = "<i class='fas fa-trash'></i>";
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
  })
}

function filterTasks(e) {
  const filterText = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach((task) => {
    const item = task.firstChild.textContent;

    if (item.includes(filterText.toLowerCase())) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

function clearTaskList(e) {
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }  

  clearTasksFromLocalStorage()
  e.preventDefault();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function deleteTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('You sure?')) e.target.parentElement.parentElement.remove();

    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }

  e.preventDefault();
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1); 
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task.');
  } else {

    // Create li element
    const li = document.createElement('li');
    // Add Class
    li.className = 'collection-item';
    // Create Text Node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create New Link Element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // Add icon HTML
    link.innerHTML = "<i class='fas fa-trash'></i>";
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
    // Store in LS
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';
  }

  console.log(li);
  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}