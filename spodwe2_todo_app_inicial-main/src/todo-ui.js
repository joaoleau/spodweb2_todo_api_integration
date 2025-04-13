import "./todo-list.css";
import { addTodo, markTodoAsDone, getTodos } from "./todo-list.js";

const TodoFilter = {
    ALL: "all",
    DONE: "done",
    PENDING: "pending",
};

document.getElementById("new-todo").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        const newTodoInput = document.getElementById("new-todo");
        const todoText = newTodoInput.value.trim();
        if (todoText === "") return;

        addTodo(todoText);
        newTodoInput.value = "";
        renderTodos();
    }
});

document.getElementById("filter-all").addEventListener("click", function () {
    renderTodos(TodoFilter.ALL);
});

document.getElementById("filter-done").addEventListener("click", function () {
    renderTodos(TodoFilter.DONE);
});

document
    .getElementById("filter-pending")
    .addEventListener("click", function () {
        renderTodos(TodoFilter.PENDING);
    });

async function renderTodos(filter = TodoFilter.ALL) {
    const todoListUl = document.getElementById("todo-list");
    const todos = await getTodos();

    todoListUl.innerHTML = "";

    const filteredTodos = todos.filter((todo) => {
        if (filter === TodoFilter.ALL) return true;
        if (filter === TodoFilter.DONE) return todo.done;
        if (filter === TodoFilter.PENDING) return !todo.done;
    });

    for (const todo of filteredTodos) {
        const todoItemLi = document.createElement("li");
        todoItemLi.textContent = todo.text;

        if (!todo.done) {
            const markTodoAsDoneButton = document.createElement("button");
            markTodoAsDoneButton.textContent = "Concluir";
            markTodoAsDoneButton.onclick = function () {
                markTodoAsDone(todo.id);
                renderTodos();
            };
            todoItemLi.appendChild(markTodoAsDoneButton);
        } else {
            todoItemLi.style.textDecoration = "line-through";
        }

        todoListUl.appendChild(todoItemLi);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");
    renderTodos();
});
