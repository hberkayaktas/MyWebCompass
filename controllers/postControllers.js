const Category = require("../models/category");
const Post = require("../models/post");
const User = require("../models/user");

exports.getAddPost = async (req, res) => {
  const category = await Category.find({});
  res.render("post/add-post", { category });
};

exports.postAddPost = async (req, res) => {
  const categoryId = req.body.categoryIn;
  const category = await Category.findById(categoryId);
  const post = await Post.create({
    postTitle: req.body.postTitle,
    postDescription: req.body.postDescription,
    categoryIn: categoryId,
    categoryInTitle: category.categoryName,
  });
  res.redirect("/all-post");
};

exports.getUpdatePostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  const category = await Category.find({});
  res.render("post/edit-post", { post, category });
};

exports.postUpdatePostById = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  const category = await Category.findById(req.body.categoryIn);
  post.postTitle = req.body.postTitle;
  post.postDescription = req.body.postDescription;
  post.categoryIn = req.body.categoryIn;
  post.categoryInTitle = category.categoryName;
  post.save();
  res.redirect("/all-post");
};

exports.deletePostById = async (req, res) => {
  await Post.findByIdAndRemove(req.params.id);
  res.redirect("/all-post");
};



exports.getAllPost = async (req, res) => {
  const post = await Post.find({});
  const postCount = await Post.find().countDocuments();
  res.render("post/all-post", { post, postCount });
};
