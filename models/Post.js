const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({ 
  title: { type: String, required: true },
  body: { type: String, required: true },
  published: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
 }, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;