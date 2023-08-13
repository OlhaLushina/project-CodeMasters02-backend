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
      maxlength: 254,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

reviewSchema.post("save", handleMongooseError); // якщо валідація не пройде, то видасть помилку

//Схема валідації Joi
const sendReviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(), //
  text: Joi.string().max(254).required(),
});

// Створюємо модель
const Review = model("review", reviewSchema);

module.exports = {
  Review,
  sendReviewSchema,
};
