const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

// Схема mongoose
const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: [true, "Rating is required"],
    },
    text: {
      type: String,
      required: [true, "Review text is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

reviewSchema.post("save", handleMongooseError); // якщо валідація не пройде, то видасть помилку

//Схема валідації Joi
const sendReviewSchema = Joi.object({
  rating: Joi.number().required(), //
  text: Joi.string().max(300).required(),
});

// Створюємо модель
const Review = model("review", reviewSchema);

module.exports = {
  Review,
  sendReviewSchema,
};
