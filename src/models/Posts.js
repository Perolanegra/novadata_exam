const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema({
  title: {
    type: String,
    default: null,
  },
  content: {
    type: String,
    default: null,
  },
  author_id: {
    type: String,
    required: true,
  },
  category_id: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: null,
  },
});

const Posts = mongoose.model("Posts", PostsSchema);

module.exports = Posts;
