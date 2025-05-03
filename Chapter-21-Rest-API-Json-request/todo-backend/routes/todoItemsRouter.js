//external module
const express = require("express");
const todoItemRouter = express.Router();

//local modules
const todoController = require("../controller/todoController");

todoItemRouter.get("/", todoController.getTodoItem);
todoItemRouter.post("/", todoController.createTodoItem);
todoItemRouter.delete("/:id", todoController.deleteTodoItem);
todoItemRouter.put("/:id/completed", todoController.markCompleted);

module.exports = todoItemRouter;
