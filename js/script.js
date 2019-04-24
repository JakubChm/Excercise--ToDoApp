const addInput = document.getElementById('add-field');
const searchInput = document.getElementById('search-field');
const addBtn = document.querySelector('.add-button');
const searchBtn = document.querySelector('.search-button');
const ul = document.querySelector('.todo-list__tasks');
const numberOfTasks = document.querySelector('.tasks-number');
const completedTasts = document.querySelector('.doneTask-Number');
const notCompletedTasts = document.querySelector('.toCompleteTask-Number');

const todoList = [];
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
const addError = () => {
  if (addInput.value === "") return alert('You can\'t add an empty string to your TODO list. Please try one more time.');
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
  e.target.parentNode.remove();
  const index = e.target.parentNode.dataset.id;
  todoList.splice(index, 1);
  updateList();
}
// Search
const searchError = () => {
  if (searchInput.value === "") return alert('You can\'t search nothing lol. Please try one more time.');
  if (todoList.length === 0) return alert('You can\'t search on empty list. Please try one more time.');
  console.log('weszło');
}







const addTask = (e) => {
  e.preventDefault();
  addError();
  createTodoElement();
  updateList();
  addInput.value = "";
  document.querySelectorAll('.delete-btn').forEach(btnElement => btnElement.addEventListener('click', removeTask));
}

const searchTask = (e) => {
  e.preventDefault();
  searchError();

}
addBtn.addEventListener('click', addTask)
searchBtn.addEventListener('click', searchTask)