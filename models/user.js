const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const Joi = require('joi');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // регуляйрний вираз для email

//const phoneRegexp = /^\+38 \(\d{3}\) \d{3}-\d{4}$/; // регуляйрний вираз для телефона

//const birthdayRegexp =  /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/((19|20)\d\d)$/; // регуляйрний вираз для дати народження
const birthdayRegexp =  /^\d{4}-\d{2}-\d{2}$/; // регуляйрний вираз для дати народження


// Схема валідації mongoose (даних, які хочемо зберегти)
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlength: 16,
    default: "",
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
  birthday: {
    type: String,
    maxlength: 10,
    match: birthdayRegexp,
    default: "",
  },
  phone: {
    type: String,
    maxlength: 18,
    default: "",
  },
  skype: {
    type: String,
    maxlength: 254,
    default: "",
  },
  token: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    maxlength: 254,
    default: "",
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

// Схема валідації Joi для редагування користувача (даних, що прийшли)
const editSchema = Joi.object({
    name: Joi.string().max(16).required(),
    email: Joi.string().max(254).pattern(emailRegexp).required(),
    birthday: Joi.string().max(10).pattern(birthdayRegexp).allow(""),
    phone: Joi.string().max(18).allow(""),
    skype: Joi.string().max(254).allow(""),
    avatar: Joi.string().max(254).allow(""),
});

// Об'єднуємо схеми Joi
const schemas = {
  registerSchema,
  loginSchema,
  editSchema,
}

// Створюємо модель
const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
}