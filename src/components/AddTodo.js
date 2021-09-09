import React, { useRef } from "react";

const AddTodo = (props) => {
  const todoInput = useRef();
  let todoId = 0;

  const confirmHandler = (event) => {
    event.preventDefault();
    todoId = Math.round(Math.random() * 10000 + 1);
    const enteredTodo = todoInput.current.value;
    const fetchedTodo = localStorage.getItem("todoList");
    const todoToSave = {
      todo: enteredTodo,
      savedDate: props.dateToSave,
      id: todoId,
      finished: false,
    };

    if (fetchedTodo === null) {
      const todos = [];
      todos.push(todoToSave);
      localStorage.setItem("todoList", JSON.stringify(todos));
    } else {
      const parsedTodos = JSON.parse(fetchedTodo);
      parsedTodos.push(todoToSave);
      localStorage.setItem("todoList", JSON.stringify(parsedTodos));
    }
    props.onClick();
  };

  return (
    <div className="newtodo">
      <h2>Add a new todo</h2>
      <h3>{props.date}</h3>
      <form onSubmit={confirmHandler}>
        <input type="text" required ref={todoInput}></input>
        <button>Confirm</button>
        <button onClick={props.onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default AddTodo;
