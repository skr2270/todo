//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event) {
    // console.log("hello");
    event.preventDefault(); // To prevent default behaviour //Prevent form from submitting
    //Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create li
    const todoLi = document.createElement('li');
    todoLi.innerText = todoInput.value;
    todoLi.classList.add('todo-item');
    todoDiv.appendChild(todoLi);
    //Add Todo to Local Storage
    saveLocalTodos(todoInput.value);
    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append to UL list
    todoList.appendChild(todoDiv);
    //Clear Todo Input Value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    //Delete Todo
    if (item.classList[0] === 'trash-btn') {
        // item.remove();
        const todo = item.parentElement;
        todo.classList.add("fall"); //animation
        removeLocalTodos(todo); // Deleting Todo
        todo.addEventListener('transitionend', function () {
                   todo.remove(); 
        });
    }
    //Mark Completed Todo
    if (item.classList[0] === 'complete-btn') {
        // item.remove();
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
       } 
    });
}
function saveLocalTodos(todo) {
    //To check whether our todos locally stored or not?
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos() {
    let todos;
        if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
            //Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create li
    const todoLi = document.createElement('li');
    todoLi.innerText = todo;
    todoLi.classList.add('todo-item');
    todoDiv.appendChild(todoLi);
    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append to UL list
    todoList.appendChild(todoDiv);       
    });
}
function removeLocalTodos(todo) {
        let todos;
        if (localStorage.getItem("todos") === null) {
        todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
    // console.log(todo.children);
    // console.log(todo.children[0].innerText);
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));

}