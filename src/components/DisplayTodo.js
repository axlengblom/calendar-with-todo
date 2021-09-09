import React from "react";

const DisplayTodo = (props) => {
  let renData;

  let noTodos = true;

  const lookupTodos = () => {
    const fetchedTodos = JSON.parse(localStorage.getItem("todoList"));
    const todosToDisplay = [];
    if (fetchedTodos != null) {
      for (let i = 0; i < fetchedTodos.length; i++) {
        if (fetchedTodos[i].savedDate === props.dateToLookUp) {
          todosToDisplay.push(fetchedTodos[i]);
          noTodos = false;
        }
      }
      renData = todosToDisplay.map(({ todo, savedDate, id, finished }) => {
        return (
          <li key={id} className="singletodo">
            <h2>{todo}</h2>
            <p>{savedDate}</p>
            <p>Done: {finished ? "Yes" : "No"}</p>
            <button
              onClick={() => {
                changeFinished(id);
              }}
            >
              Done
            </button>
            <button
              onClick={() => {
                deleteTodo(id);
              }}
            >
              Delete
            </button>
          </li>
        );
      });
    }
  };
  const deleteTodo = (idToDelete) => {
    const fetchedTodos = JSON.parse(localStorage.getItem("todoList"));

    for (var i = 0; i < fetchedTodos.length; i++) {
      if (fetchedTodos[i].id === idToDelete) {
        fetchedTodos.splice(i, 1);
        localStorage.clear();
        if (fetchedTodos.length !== 0) {
          localStorage.setItem("todoList", JSON.stringify(fetchedTodos));
        }
      }
    }
  };
  const changeFinished = (idToChange) => {
    const fetchedTodos = JSON.parse(localStorage.getItem("todoList"));

    for (var i = 0; i < fetchedTodos.length; i++) {
      if (fetchedTodos[i].id === idToChange) {
        fetchedTodos[i].finished = true;
        localStorage.clear();
        if (fetchedTodos.length !== 0) {
          localStorage.setItem("todoList", JSON.stringify(fetchedTodos));
        }
      }
    }
  };

  return (
    <div className="dailytodos">
      <h1 onChange={lookupTodos()}>
        {props.dateToLookUp} {noTodos ? "" : "Deadlines:"}
      </h1>
      <ul onChange={lookupTodos()}>{renData}</ul>
    </div>
  );
};

export default DisplayTodo;
