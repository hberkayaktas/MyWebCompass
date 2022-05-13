const Category = require('../models/category')
const Post = require('../models/post')
const User = require('../models/user')

exports.getIndexPage = async (req, res) => {
  console.log(req.session.userID);
  const category = await Category.find({});
  res.render("main/index", { category });
};

exports.getAboutPage = async (req, res) => {
  res.render("main/about");
};

exports.getProjectPage = async (req, res) => {
  res.render("main/project");
};

exports.getRegisterPage = async (req, res) => {
  res.render("user/register");
};

exports.postRegisterPage = async (req, res) => {
      const user = await User.create({
            name: req.body.name,
            userName: req.body.username,
            password: req.body.password,
            email:  req.body.email,
      });
      res.redirect("/register");      
}

exports.getMainDetail = async (req, res) => {
      const post = await Post.find({categoryIn:req.params.id});
      const postCount = await Post.find({categoryIn:req.params.id}).countDocuments();
      const category = await Category.findById(req.params.id);
      res.render("main/main-detail",{post,postCount,category});
}

exports.getPostDetailById = async (req, res) => {
      singlePost = await Post.findById(req.params.id);
      category = singlePost.categoryIn;
      allPost = await Post.find({ categoryIn: category });
    
      const postCount = await Post.find({ categoryIn: category }).countDocuments();
      res.render("post/post-details", { singlePost, allPost, postCount });
    };