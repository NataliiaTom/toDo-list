const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todosFilter = document.querySelector(".filter-todo");

///event listeners
document.addEventListener("DOMContentLoaded", getTodods);
todoButton.addEventListener("click", submitInput);
todoList.addEventListener("click", deleteCheck);
todosFilter.addEventListener("change", filterInputs);

//////functions
function submitInput(event) {
  event.preventDefault();
  const createDiv = document.createElement("div");
  createDiv.classList.add("todo");
  //create li
  const createLi = document.createElement("li");
  createLi.classList.add("todo-item");
  createLi.innerText = todoInput.value;

  saveLocalTodos(todoInput.value);
  todoInput.value = "";
  createDiv.appendChild(createLi);
  /////CHECK BUTTON
  const checkButton = document.createElement("button");
  checkButton.innerHTML = '<i class="fas fa-check"></i>';
  checkButton.classList.add("complete-button");
  createDiv.appendChild(checkButton);
  ////TRASH BUTTON
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-button");
  createDiv.appendChild(trashButton);
  /////APPENT TO LIST
  todoList.appendChild(createDiv);
}

function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "trash-button") {
    const element = item.parentElement;
    element.classList.add("false");
    removeTodos(element);
    element.addEventListener("transitionend", function () {
      element.remove();
    });
  }

  if (item.classList[0] === "complete-button") {
    const element = item.parentElement;
    element.classList.toggle("completed");
  }
}

function filterInputs(e) {
  const todos = todoList.childNodes;
  console.log(todoList);
  console.log(todos);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodods() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    const createDiv = document.createElement("div");
    createDiv.classList.add("todo");
    //create li
    const createLi = document.createElement("li");
    createLi.classList.add("todo-item");
    createLi.innerText = todo;
    createDiv.appendChild(createLi);
    /////CHECK BUTTON
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add("complete-button");
    createDiv.appendChild(checkButton);
    ////TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-button");
    createDiv.appendChild(trashButton);
    /////APPENT TO LIST
    todoList.appendChild(createDiv);
  });
}

function removeTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  console.log(todo.children[0].innerText);
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);

  localStorage.setItem("todos", JSON.stringify(todos));
}
