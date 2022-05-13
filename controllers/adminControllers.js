const Category = require("../models/category");
const Post = require("../models/post");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.getLoginPage = (req, res) => {
  res.render("user/login");
};

exports.postLoginPage = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          // USER SESSION
          req.session.userID = user._id;
          res.status(200).redirect("/");
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getAddCategory = async (req, res) => {
  res.render("category/add-category");
};

exports.postAddCategory = async (req, res) => {
  await Category.create(req.body);
  res.redirect("/");
};

exports.getAllCategory = async (req, res) => {
  const category = await Category.find({});
  const categoryCount = await Category.find().countDocuments();
  res.render("category/all-category", { category, categoryCount });
};
exports.getUpdateByCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.render("category/edit-category", { category });
};

exports.postUpdateByCategory = async (req, res) => {
  const category = await Category.findOne({ _id: req.params.id });
  category.categoryName = req.body.categoryName;
  category.icon = req.body.icon;
  category.iconB = req.body.iconB;
  category.save();
  res.redirect("/all-category");
};

exports.getDeleteCategory = async (req, res) => {
  await Category.findByIdAndRemove(req.params.id);
  res.redirect("/all-category");
};
