const { HttpError, ctrlWrapper } = require('../../helpers');

// Перевірка валідності токена
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