const express = require("express");
const { validateBody, authenticate, passport } = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");

const router = express.Router();

// Реєстрація (signup)
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

// Авторизація (signin)
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

// Розлогінитись (logout)
router.post("/logout", authenticate, ctrl.logout);

// Перехід на сторінку авторизації через Google
router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

// Перехід після вибору аккаунта Google назад на бекенд
router.get("/google/callback", passport.authenticate("google", { session: false }), ctrl.googleAuth);

module.exports = router;
