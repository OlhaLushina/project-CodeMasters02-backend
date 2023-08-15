const express = require('express');
const { validateBody, authenticate} = require('../../middlewares');
const ctrl = require('../../controllers/user');
const { schemas } = require('../../models/user');

const router = express.Router();

// Отримання даних про користувача
router.get('/current', authenticate, ctrl.getCurrent);

// Редагування користувача
router.patch('/', authenticate, validateBody(schemas.editSchema), ctrl.editUser);

module.exports = router;