const TodoItem = require("../models/todoItems");

exports.createTodoItem = async (req, res, next) => {
  console.log("body :", req.body);
  const { task, date } = req.body;
  const todoItem = new TodoItem({ task, date });
  await todoItem.save();
  res.status(201).json(todoItem);
};
