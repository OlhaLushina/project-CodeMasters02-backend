const express = require('express');
const { authenticate} = require('../../middlewares');
const ctrl = require('../../controllers/user');

const router = express.Router();

// Отримання даних про користувача
router.get('/current', authenticate, ctrl.getCurrent);

module.exports = router;