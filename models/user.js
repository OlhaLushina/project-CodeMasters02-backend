const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const Joi = require('joi');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // регуляйрний вираз для email
const phoneRegexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/; 

// Схема валідації mongoose (даних, які хочемо зберегти)
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlength: 16,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    maxlength: 254,
    match: emailRegexp,
    unique: true,
  },
  password: {
    type: String,
    minlengh: 6,
    maxlength: 254,
    required: [true, 'Password is required'],
  },
  dateBirthday: {
    type: Date,
  },
  phone: {
    type: String,
    maxlength: 13,
    match: phoneRegexp,
  },
  skype: {
    type: String,
    maxlength: 16,
  },
  token: {
    type: String,
  },
  avatar: {
    type: String,
  },
}, { versionKey: false, timestamps: true }
    // versionKey: false - щоб не строрювалось поле "__v" з версією документа при додаванні данних
    // timestamps: true - щоб створювались поля createdAt і updatedAt (дата строрення і оновлення)
);

userSchema.post("save", handleMongooseError); // якщо валідація не пройде, то видасть помилку

// Схема валідації Joi для реєстрації (даних, що прийшли)
const registerSchema = Joi.object({
    name: Joi.string().max(16).required(),
    email: Joi.string().max(254).pattern(emailRegexp).required(),
    password: Joi.string().min(6).max(254).required(),
});

// Схема валідації Joi для авторизації (даних, що прийшли)
const loginSchema = Joi.object({
    email: Joi.string().max(254).pattern(emailRegexp).required(),
    password: Joi.string().min(6).max(254).required(),
});

// Об'єднуємо схеми Joi
const schemas = {
  registerSchema,
  loginSchema,
}

// Створюємо модель
const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
}