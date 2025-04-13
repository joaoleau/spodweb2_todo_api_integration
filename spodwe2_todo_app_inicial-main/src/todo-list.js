const todos = [];

export async function getTodos() {

    return await fetch("http://localhost:3000/todos").then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        return response.json();
    });
}

export function addTodo(todoText) {
    const lastId = todos.length > 0 ? todos[todos.length - 1].id : 0;

    const newTodo = {
        id: lastId + 1,
        text: todoText,
        done: false,
    };

    todos.push(newTodo);
}

export function markTodoAsDone(todoId) {
    const todo = todos.find((todo) => todo.id === todoId);
    todo.done = true;
}