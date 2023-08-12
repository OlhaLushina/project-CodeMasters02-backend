const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");
// const moment = require("moment/moment");

const timeRegexp = /^([01]\d|2[0-3]):([0-5]\d)$/;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxlength: 250,
    },
    start: {
      // type: Date, //Уточнити
      type: String,
      required: [true, "Start time is required"],
      // min: moment(),
      // max: "2100-12-31",
    },
    end: {
      // type: Date, //Уточнити
      type: String,
      required: [true, "End time is required"],
      // min: moment(),
      // max: "2100-12-31",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "Priority is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    category: {
      type: String,
      enum: ["to-do", "in-progress", "done"],
      required: [true, "Category is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

taskSchema.post("save", handleMongooseError);

const addTaskSchema = Joi.object({
  title: Joi.string().max(250).required(),
  // start: Joi.date().required(),
  // end: Joi.date().greater(Joi.ref("start")).required(),
  start: Joi.string().pattern(timeRegexp).required(),
  end: Joi.string().pattern(timeRegexp).required(),
  priority: Joi.string().valid("low", "medium", "high").required(),
  date: Joi.date().iso().min(new Date()).max("2100-12-31").required(),
  category: Joi.string().valid("to-do", "in-progress", "done").required(),
});

const editTaskSchema = Joi.object({
  title: Joi.string().max(250).required(),
  // start: Joi.date().required(),
  // end: Joi.date().greater(Joi.ref("start")).required(),
  start: Joi.string().pattern(timeRegexp).required(),
  end: Joi.string().pattern(timeRegexp).required(),
  priority: Joi.string().valid("low", "medium", "high").required(),
  date: Joi.date().iso().max("2100-12-31").required(),
  category: Joi.string().valid("to-do", "in-progress", "done").required(),
});

const Task = model("task", taskSchema);

module.exports = {
  Task,
  addTaskSchema,
  editTaskSchema,
};
