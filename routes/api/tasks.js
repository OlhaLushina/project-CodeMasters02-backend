const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const { addTaskSchema, editTaskSchema } = require("../../models/task");
const ctrl = require("../../controllers/tasks");

const router = express.Router();

// Повертає всі завдання за місяць
router.get("/", authenticate, ctrl.getAllTasksOfMonth);

// Додати завдання
router.post("/", authenticate, validateBody(addTaskSchema), ctrl.addTask);

// редагувати завдання
router.patch("/:id", authenticate, validateBody(editTaskSchema), ctrl.editTask);

// Видалити завдання
router.delete("/:id", authenticate, ctrl.deleteTask);

// Отримати статистику по завданнях
router.post("/statistics", authenticate, ctrl.getStatistics);

module.exports = router;
