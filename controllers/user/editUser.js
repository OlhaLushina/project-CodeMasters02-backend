const path = require('path');
const { HttpError, ctrlWrapper } = require('../../helpers');
const { User } = require('../../models/user');

// Редагування даних про користувача
const editUser = async (req, res) => {
    const { _id } = req.user;
    const { email: newEmail } = req.body;
    const avatar = req.file.path;

    // Шукаємо іншого користувача з даним e-mail, щоб при зміні e-mail не було повторів в БД
    const user = await User.findOne({ _id: { $ne: _id }, email: newEmail  });

    // Якщо інший користувач з таким email вже існує в БД
    // Статус помилки 409 видасть і handleMongooseError, але це для тексту повідомлення
    if (user) {
        throw HttpError(409, "Email already is use");
    }

    const editedUser = await User.findByIdAndUpdate(_id, { ...req.body, avatar }, { new: true });

    if (!editedUser) {
      throw HttpError(404, "Not found user's id");
    }

    res.json({
        name: editedUser.name,
        email: editedUser.email,
        birthday: editedUser.birthday,
        phone: editedUser.phone,
        skype: editedUser.skype,
        avatar: editedUser.avatar,
    });
}

module.exports = {
    editUser: ctrlWrapper(editUser),
}