const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const { sendReviewSchema } = require("../../models/review");
const ctrl = require("../../controllers/reviews");

const router = express.Router();

// Повертає всі відгуки
router.get("/reviews", validateBody(sendReviewSchema), ctrl.getAll);

//Повертає користувачу свій відгук
router.get("/reviews/own", authenticate, ctrl.getOwn);
