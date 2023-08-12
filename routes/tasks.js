const express = require("express");
const { validateBody, authenticate } = require("../middlewares");
const { addTaskSchema, editTaskSchema } = require("../models/task");
const ctrl = require("../controllers/tasks");

const router = express.Router();

// Повертає всі завдання за місяць
router.get("/", authenticate, ctrl.getAllTasksOfMonth);

// Додати завдання
router.post("/", authenticate, validateBody(addTaskSchema), ctrl.addTask);

router.patch("/:id", authenticate, validateBody(editTaskSchema), ctrl.editTask);

router.delete("/:id", authenticate, ctrl.deleteTask);

module.exports = router;
