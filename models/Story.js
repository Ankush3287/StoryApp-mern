//Whenever we are dealing with new resource in db we need a model for it

const mongoose = require("mongoose");
const StorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    //Remove whitespace
    trim: true,
  },
  body: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "public",
    //List of possible values
    enum: ["public", "private"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    //Connecting to User model
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Story", StorySchema);
