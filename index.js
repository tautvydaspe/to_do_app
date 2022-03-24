//Selectors
const toDoInput = document.querySelector('.todo-input')
const toDoButton = document.querySelector('.todo-button')
const toDoList = document.querySelector('.todo-list')
const filterOption = document.querySelector(".filter-todo")


//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos)
toDoButton.addEventListener("click", addTodo)
toDoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("click", filterTodo)

//Functions
function addTodo(event) {
     //Prevent form from submitting
     event.preventDefault()
     //Todo DIV
     const toDoDiv = document.createElement("div")
     toDoDiv.classList.add("todo")
     //Create LI
     const newTodo = document.createElement("li")
     newTodo.innerText = toDoInput.value
     newTodo.classList.add("todo-item")
     toDoDiv.appendChild(newTodo)
     //CHECK MARK BUTTON
     const completedButton = document.createElement("button")
     completedButton.innerHTML = '<i class="fas fa-check"></i>'
     completedButton.classList.add("complete-btn")
     toDoDiv.appendChild(completedButton)
     //CHECK TRASH BUTTON
     const trashButton = document.createElement("button")
     trashButton.innerHTML = '<i class="fas fa-trash"></i>'
     trashButton.classList.add("trash-btn")
     toDoDiv.appendChild(trashButton)
     //APPEND TO LIST
     toDoList.appendChild(toDoDiv)
     //ADD TODO TO LOCAL STORAGE
     saveLocalTodos(toDoInput.value)
     //localStorage.clear()
     //Clear Todo input value
     toDoInput.value=""
}

function deleteCheck(event) {
     const item = event.target
     //DELETE TODO
     if (item.classList[0] === "trash-btn") {
          const todo = item.parentElement
          //Animation
          todo.classList.add("fall")
          removeLocalTodos(todo)
          todo.addEventListener("transitionend", function () {
               todo.remove()
          })
     }

     //CHECK MARK
     if (item.classList[0] === "complete-btn") {
          const todo = item.parentElement
          todo.classList.toggle('completed')
     }

}

function filterTodo(event) {
     const todos = toDoList.childNodes
     todos.forEach(function(todo) {
          switch (event.target.value) {
               case "all":
                    todo.style.display="flex"
                    break
               case "completed":
                    if (todo.classList.contains("completed")) {
                         todo.style.display = 'flex'
                    } else {
                         todo.style.display = 'none'
                    }
                    break
               case "uncompleted":
                    if (!todo.classList.contains("completed")) {
                         todo.style.display = "flex"
                    } else {
                         todo.style.display = "none"
                    }
                    break
          }
     })
}

function saveLocalTodos(todo) {
     //CHECK IF THERE IS SOMETHING IN LOCAL STORAGE
     let todos
     if (localStorage.getItem('todos')===null) {
          todos = [];
     } else {
          todos = JSON.parse(localStorage.getItem('todos'))
     }
     todos.push(todo)
     localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
     //CHECK IF THERE IS SOMETHING IN LOCAL STORAGE
     let todos
     if (localStorage.getItem('todos')===null) {
          todos = [];
     } else {
          todos = JSON.parse(localStorage.getItem('todos'))
     }
     todos.forEach(function (todo) {
          //Todo DIV
          const toDoDiv = document.createElement("div")
          toDoDiv.classList.add("todo")
          //Create LI
          const newTodo = document.createElement("li")
          newTodo.innerText = todo
          newTodo.classList.add("todo-item")
          toDoDiv.appendChild(newTodo)
          //CHECK MARK BUTTON
          const completedButton = document.createElement("button")
          completedButton.innerHTML = '<i class="fas fa-check"></i>'
          completedButton.classList.add("complete-btn")
          toDoDiv.appendChild(completedButton)
          //CHECK TRASH BUTTON
          const trashButton = document.createElement("button")
          trashButton.innerHTML = '<i class="fas fa-trash"></i>'
          trashButton.classList.add("trash-btn")
          toDoDiv.appendChild(trashButton)
          //APPEND TO LIST
          toDoList.appendChild(toDoDiv)
     })
}

function removeLocalTodos(todo) {
     let todos
     if (localStorage.getItem('todos')===null) {
          todos = [];
     } else {
          todos = JSON.parse(localStorage.getItem('todos'))
     }
     const todoIndex = todo.children[0].innerText
     todos.splice(todos.indexOf(todoIndex), 1)
     localStorage.setItem("todos", JSON.stringify(todos))
}