//external module
const express = require("express");
const todoItemRouter = express.Router();

//local modules
const todoController = require("../controller/todoController");

todoItemRouter.post("/", todoController.createTodoItem);
// todoController.get("/login", todoController.getLogin);

module.exports = todoItemRouter;
