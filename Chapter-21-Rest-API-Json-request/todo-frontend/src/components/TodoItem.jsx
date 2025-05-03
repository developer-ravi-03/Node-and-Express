/* eslint-disable react/prop-types */
import { MdDelete } from "react-icons/md";

function TodoItem({ id, todoName, todoTime, onDeleteClick }) {
  // Format the date to display only the date portion
  const formatDate = (dateString) => {
    if (!dateString) return "";

    // Create a new Date object from the date string
    const date = new Date(dateString);

    // Format the date as MM/DD/YYYY or your preferred format
    return date.toLocaleDateString();
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-3">
      <div className="flex flex-wrap items-center gap-3 p-4 bg-white border-l-4 border-blue-500 border-t border-r border-b border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex-1 min-w-[250px]">
          <h3 className="font-semibold text-gray-800 truncate">{todoName}</h3>
        </div>
        <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
          {formatDate(todoTime)}
        </div>
        <div>
          <button
            type="button"
            className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-sm hover:shadow transition-all duration-200"
            onClick={() => onDeleteClick(id)}
            aria-label="Delete todo"
          >
            <MdDelete className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
