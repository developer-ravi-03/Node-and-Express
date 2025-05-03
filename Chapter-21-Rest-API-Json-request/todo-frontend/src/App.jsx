import AddTodo from "./components/AddTodo";
import AppName from "./components/AppName";
import "./App.css";
import TodoItems from "./components/TodoItems";
import { useState } from "react";
import WelcomeMessage from "./components/WelcomeMessage";

function App() {
  const initialtodoItems = [
    // {
    //   name: "Go to college",
    //   duedate: "06/12/2024",
    // },
    // {
    //   duedate: "right now",
    //   name: "Subscribe my video",
    // },
    // {
    //   name: "Buy milk",
    //   duedate: "16/12/2024",
    // },
    // {
    //   name: "Eat pizza",
    //   duedate: "09/12/2024",
    // },
  ];

  const [todoItems, setTodoItems] = useState(initialtodoItems);

  // const handleNewItem = (itemName, itemDueDate) => {
  //   const newTodoItems = [
  //     ...todoItems,
  //     { name: itemName, duedate: itemDueDate },
  //   ];
  //   setTodoItems(newTodoItems);
  // };

  const handleNewItem = (itemName, itemDueDate) => {
    // setTodoItems((currValue) => {
    //   const newTodoItems = [
    //     ...currValue,
    //     { name: itemName, duedate: itemDueDate },
    //   ];
    //   return newTodoItems;
    // });

    setTodoItems((currValue) => [
      ...currValue,
      { name: itemName, duedate: itemDueDate },
    ]);
  };

  const handleDeleteItem = (todoItemName) => {
    const newTodoItems = todoItems.filter((item) => item.name !== todoItemName);
    setTodoItems(newTodoItems);
  };

  return (
    <center className="todo-container">
      <AppName />
      <AddTodo onNewItem={handleNewItem} />
      {todoItems.length === 0 && <WelcomeMessage todoItems={todoItems} />}
      <TodoItems todoItems={todoItems} onDeleteClick={handleDeleteItem} />
    </center>
  );
}

export default App;
