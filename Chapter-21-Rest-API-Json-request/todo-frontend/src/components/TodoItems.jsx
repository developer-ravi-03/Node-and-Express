/* eslint-disable react/prop-types */
import TodoItem from "./TodoItem";

const TodoItems = ({ todoItems, onDeleteClick }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-6 space-y-4">
      {todoItems.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          todoTime={item.duedate}
          todoName={item.name}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </div>
  );
};

export default TodoItems;
