const { validationResult } = require("express-validator");
const Category = require("../models/category");
const Post = require("../models/post");
const User = require("../models/user");

exports.getIndexPage = async (req, res) => {
  console.log(req.session.userID);
  const category = await Category.find({});
  const post = await Post.find();
  let groupped = [];
  function sayac(cat, pos) {
    let i = 0;
    while (i < cat.length) {
      let s = 0;
      //console.log(cat[i].id)
      while (s < pos.length) {
        if (pos[s].categoryIn == cat[i].id) {
          if (groupped[i]) {
            groupped[i].rakam = groupped[i].rakam + 1;
            //console.log(groupped[i].rakam);
          } else {
            //console.log("hiç grouru p bulunamadı");
            rakam = 1;
            groupped[i] = {
              name: cat[i].categoryName,
              id: cat[i].id,
              rakam: rakam,
            };
          }
        }
        s++;
      }
      i++;
    }
  }
  await sayac(category, post);
  //console.log(groupped);
  //console.log(category);
  //console.log(post);
  title = "My Web Compass";
  res.render("main/index", { category, title, groupped });
};

exports.getAboutPage = async (req, res) => {
  title = "My Web Compass | About";
  res.render("main/about", { title });
};

exports.getProjectPage = async (req, res) => {
  title = "My Web Compass | Project";
  res.render("main/project", { title });
};

exports.getRegisterPage = async (req, res) => {
  title = "My Web Compass | Add Category";
  res.render("user/register", { title });
};

exports.postRegisterPage = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      userName: req.body.username,
      password: req.body.password,
      email: req.body.email,
      role: "User",
    });
    req.flash("success", "Gönderi başarılı şekilde oluşturuldu");
    res.redirect("/admin/login");
  } catch (error) {
    const errors = validationResult(req);
    for (let i = 0; i < errors.array().length; i++) {
      req.flash("error", `${errors.array()[i].msg}`);
    }
    res.redirect("/register");
  }
};

exports.getMainDetail = async (req, res) => {
  try {
    title = "My Web Compass | Add Category";
    const page = req.query.page || 1;
    const postPerPage = 5;

    const category = await Category.findOne({ slug: req.params.slug });
    //console.log(category);
    const post = await Post.find({ categoryIn: category.id })
      .sort("-dateCreated")
      .skip((page - 1) * postPerPage)
      .limit(postPerPage);

    const postCount = await Post.find({
      categoryIn: category.id,
    }).countDocuments();
    res.render("main/main-detail", {
      post,
      postCount,
      category,
      title,
      current: page,
      pages: Math.ceil(postCount / postPerPage),
    });
  } catch (error) {}
};

exports.getPostDetailById = async (req, res) => {
  // console.log(req.params.cslug);
  // console.log(req.params.pslug);
  categorySlug = req.params.cslug;
  const category = await Category.findOne({ slug: categorySlug });
  singlePost = await Post.findOne({ slug: req.params.pslug })
    .populate("Cuser")
    .populate("Uuser");
  if (singlePost) {
    title = `My Web Compass | ${singlePost.postTitle}`;
  }
  allPost = await Post.find({ categoryIn: category });
  const postCount = await Post.find({ categoryIn: category }).countDocuments();
  res.render("post/post-details", { singlePost, postCount, categorySlug });
};

exports.getSearch = async (req, res) => {
  const query = req.query.search;
  const page = req.query.page || 1;
  const postPerPage = 5;
  //console.log(req.query);
  let filter = {};
  if (query) {
    filter = { keyword: query };
    title = `Search for ${query}`;
  }
  if (!query) {
    (filter.keyword = ""), (title = `Search for `);
  }
  const postCount = await Post.find({
    $or: [
      { postTitle: { $regex: ".*" + filter.keyword + ".*", $options: "i" } },
      {
        postDescription: {
          $regex: ".*" + filter.keyword + ".*",
          $options: "i",
        },
      },
    ],
  }).countDocuments();
  const post = await Post.find({
    $or: [
      { postTitle: { $regex: ".*" + filter.keyword + ".*", $options: "i" } },
      {
        postDescription: {
          $regex: ".*" + filter.keyword + ".*",
          $options: "i",
        },
      },
    ],
  })
    .sort("-createdAt")
    .populate("categoryIn")
    .skip((page - 1) * postPerPage)
    .limit(postPerPage);
  //console.log(postCount);
  res.render("main/search", {
    post,
    title,
    query,
    current: page,
    pages: Math.ceil(postCount / postPerPage),
  });
};
