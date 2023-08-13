const { HttpError, ctrlWrapper } = require('../../helpers');

// Отримання даних про користувача
const getCurrent = async (req, res) => {
    const { name, email } = req.user;

    res.json({
        name,
        email,
    });
}

module.exports = {
    getCurrent: ctrlWrapper(getCurrent),
}