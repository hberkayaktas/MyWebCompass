const Category = require("../models/category");
const Post = require("../models/post");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.getDashboard =async (req, res) => {
  const user =await User.findById(req.session.userID)
  title = "My Web Compass | Admin dashboard";
  res.render("admin/dashboard", { title,user });
};

exports.getLoginPage = (req, res) => {
  title = "My Web Compass | Login";
  res.render("user/login", { title });
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
          req.session.userRole = user.role;
          req.session.userName_g = user.name;
          res.status(200).redirect("/");
        }else{
          req.flash("error","hatalı giriş happened");
          res.status(200).redirect("/admin/login");
        }
      });
    }else{
      req.flash("error","Kullanıcı Bulunamadı");
      res.status(200).redirect("/admin/login");
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
  title = "My Web Compass | Add Category";
  res.render("category/add-category", { title });
};

exports.postAddCategory = async (req, res) => {
  try{await Category.create(req.body);
  req.flash("success", "Category başarılı şekilde oluşturuldu");
  res.redirect("/admin/all-category");
}catch(error){
  req.flash("error","something happened");
  res.redirect("/admin/all-category");
}
};

exports.getAllCategory = async (req, res) => {
  title = "My Web Compass | Login";
  const category = await Category.find({});
  const categoryCount = await Category.find().countDocuments();
  res.render("category/all-category", { category, categoryCount, title });
};
exports.getUpdateByCategory = async (req, res) => {
  title = "My Web Compass | Update Category";
  const category = await Category.findById(req.params.id);
  res.render("category/edit-category", { category, title });
};

exports.postUpdateByCategory = async (req, res) => {
  const category = await Category.findOne({ _id: req.params.id });
  category.categoryName = req.body.categoryName;
  category.icon = req.body.icon;
  category.iconB = req.body.iconB;
  category.save();
  res.redirect("/admin/all-category");
};



exports.getDeleteCategory = async (req, res) => {
  await Category.findByIdAndRemove(req.params.id);
  res.redirect("/admin/all-category");
};

exports.getUpdateUser = async (req, res) => {
  title = "My Web Compass | Update User";
  const user = await User.findById(req.params.id);
  res.render("admin/update-user", { user, title });
};

exports.postUpdateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  password = user.password;
  if (user) {
    bcrypt.compare(password, user.password, (err, same) => {
      if (same) {
        user.name = req.body.name;
        user.userName = req.body.username;
        user.role = req.body.role;
        user.email = req.body.email;
        user.save();
        res.redirect("/admin/all-user");
      }else{
        user.name = req.body.name;
        user.userName = req.body.username;
        user.password = password;
        user.email = req.body.email;
        user.role = req.body.role;
        user.save();
        res.redirect("/admin/all-user");
      }
    });
  }
};

exports.getAllUser = async (req, res) => {
  title = "My Web Compass | All User";
  const users = await User.find({});
  const userCount = await User.find().countDocuments();
  res.render("admin/all-user", { users, userCount, title });
};

exports.getAddUser = async (req, res) => {
  title = "My Web Compass | Add user"
  res.render("admin/add-user", { title});
};

exports.postAddUser = async (req, res) => {
      const user = await User.create({
            name: req.body.name,
            userName: req.body.username,
            password: req.body.password,
            email:  req.body.email,
            role:req.body.role,
      });
      res.redirect("/admin/all-user");      
}

exports.deleteUser = async (req, res) => {
  await User.findByIdAndRemove(req.params.id);
  res.redirect("/admin/all-user");
};