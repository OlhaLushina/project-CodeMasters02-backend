const { Review } = require('../../models/review');
const { HttpError, ctrlWrapper } = require('../../helpers');

const addReview = async (req, res) => {
  const { _id: owner } = req.user;

  // Шукаємо відгук даного користувача
  const ownReview = await Review.findOne({ owner });

  // Якшо уже створений відгук, помилка
  // Статус помилки 409 видасть і handleMongooseError, але це для тексту повідомлення
  if (ownReview) {
    throw HttpError(409, "Review already exists");
  }

  const createdReview = await Review.create({ ...req.body, owner });

  res.status(201).json({
    rating : createdReview.rating,
    text : createdReview.text
  });
};

module.exports = {
  addReview: ctrlWrapper(addReview),
}
