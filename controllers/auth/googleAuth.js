const { ctrlWrapper } = require("../../helpers");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");

const { SECRET_KEY } = process.env;

const googleAuth = async (req, res) => {
  const { _id: id } = req.user;
  // Формуємо payload для токена
  const payload = {
    id,
  };

  // Створюємо токен
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  // Додаємо токен в БД
  await User.findByIdAndUpdate(id, { token });

  res.redirect(`https://0trava.github.io/login?token=${token}`); // редірект на сторінку логіна
};

module.exports = { googleAuth: ctrlWrapper(googleAuth) };
