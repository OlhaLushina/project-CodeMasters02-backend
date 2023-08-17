const { ctrlWrapper } = require('../../helpers');

// Отримання даних про користувача
const getCurrent = async (req, res) => {
    const { name, email, birthday, phone, skype, avatar } = req.user;

    res.json({
        name,
        email,
        birthday,
        phone,
        skype,
        avatar,
    });
}

module.exports = {
    getCurrent: ctrlWrapper(getCurrent),
}