/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { IoIosAddCircle } from "react-icons/io";

function AddTodo({ onNewItem }) {
  // const [todoName, setTodoName] = useState("");
  // const [dueDate, setDueDate] = useState("");

  const todoNameElement = useRef();
  const dueDateElement = useRef();

  // const handleNameChange = (event) => {
  //   setTodoName(event.target.value);
  //   noOfUpdates.current += 1;
  // };

  // const handleDateChange = (event) => {
  //   setDueDate(event.target.value);
  //   console.log(`no Nf Updates are : ${noOfUpdates.current}`);
  // };

  const handleAddButtonClicked = (event) => {
    // console.log(event);
    event.preventDefault();
    const todoName = todoNameElement.current.value;
    const dueDate = dueDateElement.current.value;
    console.log(`${todoName} due on ${dueDate}`);

    onNewItem(todoName, dueDate);
    todoNameElement.current.value = "";
    dueDateElement.current.value = "";
    // setTodoName("");
    // setDueDate("");
  };

  return (
    <div className="container">
      <form className="row kg-row" onSubmit={handleAddButtonClicked}>
        <div className="col-6">
          <input
            type="text"
            // value={todoName}
            // onChange={handleNameChange}
            placeholder="Enter Todo here"
            ref={todoNameElement}
            required
          />
        </div>
        <div className="col-4">
          <input
            type="date"
            // value={dueDate}
            // onChange={handleDateChange}
            ref={dueDateElement}
            required
          />
        </div>
        <div className="col-2">
          <button
            // type="button"
            className="btn btn-success kg-button"
            // onClick={handleAddButtonClicked}
          >
            <IoIosAddCircle />
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTodo;
