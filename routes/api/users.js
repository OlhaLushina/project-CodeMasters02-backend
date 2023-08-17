const express = require('express');
const { validateBody, authenticate, upload} = require('../../middlewares');
const ctrl = require('../../controllers/user');
const { schemas } = require('../../models/user');

const router = express.Router();

// Отримання даних про користувача
router.get('/current', authenticate, ctrl.getCurrent);

// Редагування користувача
router.patch('/', authenticate, upload.single("avatar") , validateBody(schemas.editSchema), ctrl.editUser);

module.exports = router;