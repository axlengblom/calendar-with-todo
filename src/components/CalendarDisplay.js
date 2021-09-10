import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import React, { useState, useRef } from "react";
import moment from "moment";
import AddTodo from "./AddTodo";
import DisplayTodo from "./DisplayTodo";
import DisplayTodos from "./DisplayTodos";
import Backdrop from "./Backdrop";

const CalendarDisplay = () => {
  const [dateState, setDateState] = useState(new Date());

  const calendarDates = useRef();

  const changeDateState = (e) => {
    setDateState(e);
  };

  const [newTodoState, setNewTodoState] = useState(false);

  const newTodo = () => {
    setNewTodoState(true);
  };

  const closeNewTodo = () => {
    setNewTodoState(false);
  };

  const fetchedTodos = JSON.parse(localStorage.getItem("todoList"));

  function getOccurrence(array, value) {
    var count = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i].savedDate === value) {
        count++;
      }
    }
    return count;
  }

  return (
    <div className="main">
      {newTodoState && (
        <AddTodo
          date={moment(dateState).format("ll")}
          dateToSave={moment(dateState).format("L")}
          onClick={closeNewTodo}
          onCancel={closeNewTodo}
        />
      )}
      {newTodoState && <Backdrop onClick={closeNewTodo} />}
      <Calendar
        value={dateState}
        onChange={changeDateState}
        onClickDay={newTodo}
        tileContent={({ date }) => {
          if (fetchedTodos != null) {
            if (
              fetchedTodos.find(
                ({ savedDate }) => savedDate === moment(date).format("L")
              )
            ) {
              return (
                <p>
                  Todos:
                  <br />
                  {getOccurrence(
                    fetchedTodos,

                    moment(date).format("L")
                  )}
                </p>
              );
            }
          }
        }}
        ref={calendarDates}
      />

      <DisplayTodos />

      <DisplayTodo
        onUpdate={changeDateState}
        dateToLookUp={moment(dateState).format("L")}
      />
    </div>
  );
};

export default CalendarDisplay;
