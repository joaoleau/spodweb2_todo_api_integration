export async function getTodos() {

    return await fetch("http://localhost:3000/todos").then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        return response.json();
    });
}


export async function addTodo(todoText) {
    return await fetch("http://localhost:3000/todos", {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({ text: todoText })
    }).then((response) => {
        
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        return response.json();
    });
}

export async function markTodoAsDone(todoId) {
    return await fetch(`http://localhost:3000/todos/${todoId}`, {
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({ done: true })
    }).then((response) => {
        
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        return response.json();
    });
}