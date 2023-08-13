const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
const { HttpError, ctrlWrapper } = require('../../helpers');
const { SECRET_KEY } = process.env;

// Реєстрація
const register = async (req, res) => {
    const { email, password } = req.body;

    // Шукаємо користувача з даним e-mail
    const user = await User.findOne({ email });
    
    // Якщо користувач з таким email вже існує в БД
    // Статус помилки 409 видасть і handleMongooseError, але це для тексту повідомлення
    if (user) {
        throw HttpError(409, "Email already is use");
    }

    // Хешуємо пароль
    const hashPassword = await bcrypt.hash(password, 10);

    // Створюємо нового користувача
    const newUser = await User.create({ ...req.body, password: hashPassword });

    // Беремо дані створеного користувача
    const createdUser = await User.findOne({ email });

    if (!createdUser) {
        throw HttpError(404, "Not found registered user");
    }

    // Формуємо payload для токена
    const payload = {
        id: createdUser._id,
    }

    // Створюємо токен
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    // Додаємо токен в БД
    await User.findByIdAndUpdate(createdUser._id, {token});

    res.status(201).json({
        token,
        user: {
            name: newUser.name,
            email: newUser.email,
        }
    });
}

module.exports = {
    register: ctrlWrapper(register),
}
