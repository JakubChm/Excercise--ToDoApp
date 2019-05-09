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
  return `<p class="li-content">${pContent}</p><div class="btn-container"><button class="todo-btn ${doneBtn}-btn">${doneBtnTextContent}</button><button class="todo-btn ${deleteBtn}-btn">${deleteBtnTextContent}</button></div>`;
};

// Add //////////////////////////////

const createTodoElement = (textContent) => {
  const liElement = document.createElement('li');
  liElement.className = "task";
  ulToDo.appendChild(liElement);
  const addComponent = createElementComponent(textContent, "done", "Done", "delete", "Delete");
  liElement.innerHTML = addComponent;
  todoList.push(liElement);
};

const createDoneElement = (e) => {
  const index = e.target.parentNode.parentNode.dataset.id;
  movedElementTextContent = todoList[index].querySelector('p').textContent;
  console.log(movedElementTextContent);
  todoList.splice(index, 1);
  const liDoneElement = document.createElement('li');
  liDoneElement.className = "task";
  ulDone.appendChild(liDoneElement);
  const addComponent = createElementComponent(movedElementTextContent, "not-done", "Not done", "delete-done", "Delete");
  liDoneElement.innerHTML = addComponent;
  doneList.push(liDoneElement);
  // updateDoneList();
  // updateList();
  updateList(todoList, ulToDo);
  updateList(doneList, ulDone);
  searchTask();
  document.querySelectorAll('.delete-done-btn').forEach(btnElement => btnElement.addEventListener('click', removeDoneTask));
  document.querySelectorAll('.not-done-btn').forEach(btnElement => btnElement.addEventListener('click', moveToTodoList));
};

const moveToTodoList = (e) => {
  const index = e.target.parentNode.parentNode.dataset.id;
  movedElementTextContent = doneList[index].querySelector('p').textContent;
  doneList.splice(index, 1);
  createTodoElement(movedElementTextContent)
  updateList(todoList, ulToDo);
  updateList(doneList, ulDone);
  searchTask();
  document.querySelectorAll('.delete-btn').forEach(btnElement => btnElement.addEventListener('click', removeTask));
  document.querySelectorAll('.done-btn').forEach(btnElement => btnElement.addEventListener('click', createDoneElement));
}
// update done and todo list //////////////////////////////
// const updateList = () => {
//   ulToDo.textContent = "";
//   todoList.forEach((todoElement, id) => {
//     ulToDo.appendChild(todoElement);
//     todoElement.dataset.id = id;
//   });
//   setTaskNumber();
// };

// const updateDoneList = () => {
//   ulDone.textContent = "";
//   doneList.forEach((todoElement, id) => {
//     ulDone.appendChild(todoElement);
//     todoElement.dataset.id = id;
//   });
// };
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
  searchTask();
};

const removeDoneTask = (e) => {
  const index = e.target.parentNode.parentNode.dataset.id;
  doneList.splice(index, 1);
  updateList(doneList, ulDone);
  setTaskNumber();
  searchTask();
};

// Main add function //////////////////////////////
const addTask = (e) => {
  e.preventDefault();
  if (addInput.value === "") return alert('You can\'t add an empty string to your TODO list. Please try one more time.');
  createTodoElement(addInput.value);
  updateList(todoList, ulToDo);
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