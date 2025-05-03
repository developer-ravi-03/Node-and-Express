/* eslint-disable react/prop-types */
import { useRef } from "react";
import { IoIosAddCircle } from "react-icons/io";

function AddTodo({ onNewItem }) {
  const todoNameElement = useRef();
  const dueDateElement = useRef();

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
    <div className="w-full max-w-4xl mx-auto">
      <form
        className="flex flex-wrap gap-2 items-center"
        onSubmit={handleAddButtonClicked}
      >
        <div className="flex-1 min-w-[250px]">
          <input
            type="text"
            placeholder="Enter Todo here"
            ref={todoNameElement}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="w-full sm:w-auto">
          <input
            type="date"
            ref={dueDateElement}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <button className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white p-2 rounded-md transition-colors">
            <IoIosAddCircle className="text-xl" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTodo;
