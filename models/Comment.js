const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({ 
  body: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
 }, { timestamps: true });

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;