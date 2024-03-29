const { timeStamp } = require("console");
const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: { type: String, required: true, maxlenght: 300 },
  imageUrl: { type: String, required: true },
  likes: { type: Number, default: 0 },
  usersLiked: { type: [String], default: [] },
});

module.exports = mongoose.model("Post", PostSchema);
