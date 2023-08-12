const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const { sendReviewSchema } = require("../../models/review");
const ctrl = require("../../controllers/reviews");

const router = express.Router();

// Повертає всі відгуки
router.get("/", ctrl.getAllReviews);

// Повертає користувачу свій відгук
router.get("/own", authenticate, ctrl.getOwnReview);

// Створення відгуку
router.post("/own", authenticate, validateBody(sendReviewSchema), ctrl.addReview);

// Редагування відгуку
router.patch("/own", authenticate, validateBody(sendReviewSchema), ctrl.editReview);

// Видалити відгук
router.delete("/own", authenticate, ctrl.deleteReview);

module.exports = router;
