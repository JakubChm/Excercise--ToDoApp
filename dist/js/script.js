const addInput = document.getElementById('add-field');
const searchInput = document.getElementById('search-field');
const addBtn = document.querySelector('.add-button');
// const searchBtn = document.querySelector('.search-button');
const ul = document.querySelector('.todo-list__tasks');
const numberOfTasks = document.querySelector('.tasks-number');
const completedTasts = document.querySelector('.doneTask-Number');
const notCompletedTasts = document.querySelector('.toCompleteTask-Number');

const todoList = [];
let filteredTodoList;
// Add
const createTodoElement = () => {
  const liElement = document.createElement('li');
  const deleteBtn = document.createElement('button');
  liElement.className = "task";
  liElement.textContent = `${addInput.value}`;
  ul.appendChild(liElement)
  deleteBtn.className = "delete-btn"
  deleteBtn.textContent = "Delete";
  liElement.appendChild(deleteBtn)
  todoList.push(liElement)
}

const updateList = () => {
  ul.textContent = "";
  todoList.forEach((todoElement, id) => {
    ul.appendChild(todoElement)
    todoElement.dataset.id = id;
  });
  setTaskNumber();
}
const setTaskNumber = () => {
  numberOfTasks.textContent = todoList.length;
}
//Remove
const removeTask = (e) => {
  const index = e.target.parentNode.dataset.id;
  todoList.splice(index, 1);
  console.log(index);
  updateList();
  searchTask();
}
// main add function
const addTask = (e) => {
  e.preventDefault();
  if (addInput.value === "") return alert('You can\'t add an empty string to your TODO list. Please try one more time.');
  createTodoElement();
  updateList();
  addInput.value = "";
  document.querySelectorAll('.delete-btn').forEach(btnElement => btnElement.addEventListener('click', removeTask));
  searchTask();
}
// Search
const updateFilteredList = () => {
  ul.textContent = "";
  filteredTodoList.forEach((todoElement) => {
    ul.appendChild(todoElement)
  });
}
//  main search function
const searchTask = () => {
  filteredTodoList = todoList.filter(todoTask => todoTask.textContent.toLowerCase().includes(searchInput.value.toLowerCase()));
  updateFilteredList();
}

addBtn.addEventListener('click', addTask)
searchInput.addEventListener('input', searchTask)