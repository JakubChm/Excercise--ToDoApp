const addInput = document.getElementById('add-field');
const searchInput = document.getElementById('search-field');
const addBtn = document.querySelector('.add-button');
const ulToDo = document.querySelector('.todo-list__tasks');
const ulDone = document.querySelector('.todo-list__tasks-done');
const numberOfTasks = document.querySelector('.tasks-number');
const completedTasts = document.querySelector('.doneTask-Number');
const notCompletedTasks = document.querySelector('.toCompleteTask-Number');

const todoList = [];
const doneList = [];

let movedElementTextContent;
let filteredTodoList;
let filteredDoneList;



// Add //////////////////////////////
const createTodoElement = (textContent) => {
  const liElement = document.createElement('li');
  const pElement = document.createElement('p');
  const btnContainer = document.createElement('div');
  const deleteBtn = document.createElement('button');
  const doneBtn = document.createElement('button');
  liElement.className = "task";
  ulToDo.appendChild(liElement);
  pElement.className = "li-content";
  pElement.textContent = `${textContent}`;
  liElement.appendChild(pElement);
  btnContainer.className = "btn-container";
  liElement.appendChild(btnContainer);
  doneBtn.className = "todo-btn done-btn";
  doneBtn.textContent = "Done";
  btnContainer.appendChild(doneBtn);
  deleteBtn.className = "todo-btn delete-btn";
  deleteBtn.textContent = "Delete";
  btnContainer.appendChild(deleteBtn);
  todoList.push(liElement);
};

const createDoneElement = (e) => {
  const index = e.target.parentNode.parentNode.dataset.id;
  movedElementTextContent = todoList[index].querySelector('p').textContent;
  console.log(movedElementTextContent);
  todoList.splice(index, 1);
  const liDoneElement = document.createElement('li');
  const pDoneElement = document.createElement('p');
  const btnDoneContainer = document.createElement('div');
  const deleteDoneBtn = document.createElement('button');
  const doneListBtn = document.createElement('button');
  liDoneElement.className = "task";
  ulDone.appendChild(liDoneElement);
  pDoneElement.className = "li-done-content";
  pDoneElement.textContent = `${movedElementTextContent}`;
  liDoneElement.appendChild(pDoneElement);
  btnDoneContainer.className = "btn-container";
  liDoneElement.appendChild(btnDoneContainer);
  doneListBtn.className = "todo-btn not-done-btn";
  doneListBtn.textContent = "Not done";
  btnDoneContainer.appendChild(doneListBtn);
  deleteDoneBtn.className = "todo-btn delete-done-btn";
  deleteDoneBtn.textContent = "Delete";
  btnDoneContainer.appendChild(deleteDoneBtn);
  doneList.push(liDoneElement);
  updateDoneList();
  updateList();
  searchTask();
  document.querySelectorAll('.delete-done-btn').forEach(btnElement => btnElement.addEventListener('click', removeDoneTask));
  document.querySelectorAll('.not-done-btn').forEach(btnElement => btnElement.addEventListener('click', moveToTodoList));
};
// update done and todo list //////////////////////////////
const updateList = () => {
  ulToDo.textContent = "";
  todoList.forEach((todoElement, id) => {
    ulToDo.appendChild(todoElement);
    todoElement.dataset.id = id;
  });
  setTaskNumber();
};

const updateDoneList = () => {
  doneList.forEach((todoElement, id) => {
    ulDone.appendChild(todoElement);
    todoElement.dataset.id = id;
  });
};

const updateFilteredList = () => {
  ulToDo.textContent = "";
  filteredTodoList.forEach((todoElement) => {
    ulToDo.appendChild(todoElement);
  });
  ulDone.textContent = "";
  filteredDoneList.forEach((doneElement) => {
    ulDone.appendChild(doneElement);
  });

};
// Remove //////////////////////////////
const removeTask = (e) => {
  const index = e.target.parentNode.parentNode.dataset.id;
  console.log(index);
  todoList.splice(index, 1);
  updateList();
  searchTask();
};

const removeDoneTask = (e) => {
  const index = e.target.parentNode.parentNode.dataset.id;
  console.log(index);
  doneList.splice(index, 1);
  ulDone.textContent = "";
  updateDoneList();
  setTaskNumber();
  searchTask();
};

// Main add function //////////////////////////////
const addTask = (e) => {
  e.preventDefault();
  if (addInput.value === "") return alert('You can\'t add an empty string to your TODO list. Please try one more time.');
  createTodoElement(addInput.value);
  updateList();
  searchTask();
  addInput.value = "";
  document.querySelectorAll('.delete-btn').forEach(btnElement => btnElement.addEventListener('click', removeTask));
  document.querySelectorAll('.done-btn').forEach(btnElement => btnElement.addEventListener('click', createDoneElement));
};
// Main search function //////////////////////////////
const searchTask = () => {
  filteredTodoList = todoList.filter(todoTask => todoTask.textContent.toLowerCase().includes(searchInput.value.toLowerCase()));
  filteredDoneList = doneList.filter(task => task.textContent.toLowerCase().includes(searchInput.value.toLowerCase()));
  updateFilteredList();
};
// Tasks number function //////////////////////////////
const setTaskNumber = () => {
  numberOfTasks.textContent = todoList.length + doneList.length;
  notCompletedTasks.textContent = todoList.length;
  completedTasts.textContent = doneList.length;
};
// Event Listeners //////////////////////////////
addBtn.addEventListener('click', addTask);
searchInput.addEventListener('input', searchTask);