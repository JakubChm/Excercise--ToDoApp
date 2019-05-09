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

const createElementComponent = (pContent, doneBtn, doneBtnTextContent, deleteBtn, deleteBtnTextContent) => {
  return `<p class="li-content m-0 mx-2 d-flex align-items-center">${pContent}</p><div class="btn-container d-flex flex-nowrap"><button class="todo-btn btn ${doneBtn}-btn mr-1 shadow">${doneBtnTextContent}</button><button class="todo-btn btn ${deleteBtn}-btn shadow">${deleteBtnTextContent}</button></div>`;
};
// Add //////////////////////////////
const createTodoElement = (textContent) => {
  const liElement = document.createElement('li');
  liElement.className = "task list-group-item d-flex justify-content-between align items-center flex-grow-1 m-2 p-2 rounded shadow";
  ulToDo.appendChild(liElement);
  const addComponent = createElementComponent(textContent, "btn-success done", "Done", "btn-danger delete", "Delete");
  liElement.innerHTML = addComponent;
  todoList.push(liElement);
};

const createDoneElement = (e) => {
  const index = e.target.parentNode.parentNode.dataset.id;
  movedElementTextContent = todoList[index].querySelector('p').textContent;
  console.log(movedElementTextContent);
  todoList.splice(index, 1);
  const liDoneElement = document.createElement('li');
  liDoneElement.className = "task list-group-item d-flex justify-content-between align items-center flex-grow-1 m-2 p-2 rounded shadow";
  ulDone.appendChild(liDoneElement);
  const addComponent = createElementComponent(movedElementTextContent, "btn-danger not-done", "Not done", "btn-danger delete-done", "Delete");
  liDoneElement.innerHTML = addComponent;
  doneList.push(liDoneElement);
  updateList(todoList, ulToDo);
  updateList(doneList, ulDone);
  searchTask(e);
  document.querySelectorAll('.delete-done-btn').forEach(btnElement => btnElement.addEventListener('click', removeDoneTask));
  document.querySelectorAll('.not-done-btn').forEach(btnElement => btnElement.addEventListener('click', moveToTodoList));
};

const moveToTodoList = (e) => {
  const index = e.target.parentNode.parentNode.dataset.id;
  movedElementTextContent = doneList[index].querySelector('p').textContent;
  doneList.splice(index, 1);
  createTodoElement(movedElementTextContent);
  updateList(todoList, ulToDo);
  updateList(doneList, ulDone);
  searchTask(e);
  document.querySelectorAll('.delete-btn').forEach(btnElement => btnElement.addEventListener('click', removeTask));
  document.querySelectorAll('.done-btn').forEach(btnElement => btnElement.addEventListener('click', createDoneElement));
};

const updateList = (setList, setUl) => {
  setUl.textContent = "";
  setList.forEach((listElement, id) => {
    setUl.appendChild(listElement);
    listElement.dataset.id = id;
  });
  setTaskNumber();
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
  todoList.splice(index, 1);
  updateList(todoList, ulToDo);
  setTaskNumber();
  searchTask(e);
};

const removeDoneTask = (e) => {
  const index = e.target.parentNode.parentNode.dataset.id;
  doneList.splice(index, 1);
  updateList(doneList, ulDone);
  setTaskNumber();
  searchTask(e);
};

// Main add function //////////////////////////////
const addTask = (e) => {
  e.preventDefault();
  if (addInput.value === "") {
    $('#exampleModalCenter').modal('show');
  } else {
    createTodoElement(addInput.value);
    updateList(todoList, ulToDo);
    searchTask(e);
    addInput.value = "";
    document.querySelectorAll('.delete-btn').forEach(btnElement => btnElement.addEventListener('click', removeTask));
    document.querySelectorAll('.done-btn').forEach(btnElement => btnElement.addEventListener('click', createDoneElement));
  }
};
// Main search function //////////////////////////////
const searchTask = (e) => {
  e.preventDefault();
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