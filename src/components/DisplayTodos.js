import React from "react";

const DisplayTodos = (props) => {
  let renData;

  const fetchedTodos = JSON.parse(localStorage.getItem("todoList"));
  if (fetchedTodos != null) {
    fetchedTodos.sort((a, b) => {
      return new Date(a.savedDate) - new Date(b.savedDate);
    });

    renData = fetchedTodos.map(({ todo, savedDate, id }) => {
      return (
        <li key={id} className="singletodo">
          <h2>{todo}</h2>
          <p>{savedDate}</p>
        </li>
      );
    });
  }
  return (
    <div className="alltodos">
      <h2>{fetchedTodos ? "Upcoming Deadlines:" : ""}</h2>
      <ul>{renData}</ul>
    </div>
  );
};

export default DisplayTodos;
