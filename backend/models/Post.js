const mongoose = require("mongoose");

const SauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  likes: { type: Number, default: 0 },
  usersLiked: { type: [String], required: false },
});

module.exports = mongoose.model("Post", SauceSchema);
