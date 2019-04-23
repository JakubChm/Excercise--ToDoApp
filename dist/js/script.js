const addInput = document.getElementById('add-field');
const searchInput = document.getElementById('search-field');
const addBtn = document.querySelector('.add-button');
const searchBtn = document.querySelector('.search-button');
const listContainer = document.querySelector('.todo-list__tasks');
const numberOfTasks = document.querySelector('.tasks-number');
const completedTasts = document.querySelector('.doneTask-Number');
const notCompleteTasts = document.querySelector('.toCompleteTask-Number');

let liItems
let buttonList

const setTaskNumber = () => {
  numberOfTasks.textContent = `${liItems.length}`;
  notCompleteTasts.textContent = `${liItems.length}`;
}

const addTask = (e) => {
  e.preventDefault();
  if (addInput.value === "") {
    return alert('You can\'t add an empty string to your TODO list. Please try with one more time.');
  } else {
    //
    // Create li element from input value
    //
    const liElement = document.createElement('li');
    listContainer.appendChild(liElement).innerHTML = `${addInput.value} <button type="submit">Delete</button>`;
    //
    // Clear add input
    //
    addInput.value = "";
    //
    // Update array with button and li elements
    //
    liItems = [...document.querySelectorAll('.todo-list__tasks li')]
    buttonList = [...document.querySelectorAll('.todo-list__tasks li button')];
    //
    // Create dataset and classes to list and button elements
    //
    for (let i = 0; i < liItems.length; i++) {
      liItems[i].dataset.id = `${i}`;
      buttonList[i].dataset.id = `${i}`;
      buttonList[i].classList.add('delete-btn')
    };
  }
  setTaskNumber();
}





addBtn.addEventListener('click', addTask)