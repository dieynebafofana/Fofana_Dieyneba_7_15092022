const { timeStamp } = require("console");
const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true, maxlenght:300},
  imageUrl: { type: String, required: true },
  video: {type : String},
  likes: { type: Number, default: 0 },
  usersLiked: { type: [String], required: false },
  comments: {type: [{commenterId: String, text: String, timeStamp: Number,}],required:true}
});

module.exports = mongoose.model("Post", PostSchema);
