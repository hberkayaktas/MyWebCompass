const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const Category = require('./models/category')
const Post = require('./models/post')

// Uygulama oluştururuz
const app = express();

//database bağlantısı
mongoose.connect('mongodb://localhost/mywebcompass-db',
{
  useNewUrlParser:true,
  useUnifiedTopology:true
});

//Wiew engine
app.set("view engine", "ejs");


//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", async (req, res) => {
      const category = await Category.find({});
      res.render("main/index",{category, });
});
app.get("/about", async (req, res) => {
      res.render("main/about");
});
app.get("/project", async (req, res) => {
      res.render("main/project");
});
app.get("/register", async (req, res) => {
      res.render("user/register");
});
app.get("/login", async (req, res) => {
      res.render("user/login");
});

app.get("/main-detail/:id", async (req, res) => {
      const post = await Post.find({categoryIn:req.params.id});
      console.log(post)
      res.render("main/main-detail",{post,});
});



app.get("/add-category", async (req, res) => {
      res.render("category/add-category");
});
app.post("/add-category", async (req, res) => {
      await Category.create(req.body);
      res.redirect("/");
});
app.get("/all-category", async (req,res)=>{
      const category = await Category.find({});
      const categoryCount = await Category.find().countDocuments();
      res.render("category/all-category",{category, categoryCount});
})

app.get("/update-category/:id", async (req,res)=>{
      const category = await Category.findById(req.params.id)
      res.render("category/edit-category",{category,});
})

app.post("/update-category/:id", async (req,res)=>{
      const category = await Category.findOne({_id:req.params.id})
      category.categoryName = req.body.categoryName;
      category.icon = req.body.icon;
      category.save();
      res.redirect("/all-category");
})
app.get("/delete-category/:id",async (req,res)=>{
      await Category.findByIdAndRemove(req.params.id);
      res.redirect('/all-category');
})



app.get("/add-post", async (req, res) => {
      const category = await Category.find({});
      res.render("post/add-post",{category, });
});
app.post("/add-post", async (req, res) => {
      const categoryId = req.body.categoryIn;
      const category = await Category.findById(categoryId);
      const post = await Post.create({
            postTitle: req.body.postTitle,
            postDescription: req.body.postDescription,
            categoryIn:categoryId,
            categoryInTitle: category.categoryName,
      });
      res.redirect("/all-post");
});

app.get("/update-post/:id", async (req,res)=>{
      const post = await Post.findById(req.params.id);
      const category = await Category.find({});
      res.render("post/edit-post",{post,category});
})

app.post("/update-post/:id", async (req,res)=>{
      const post = await Post.findOne({_id:req.params.id})
      const category = await Category.findById(req.body.categoryIn);
      post.postTitle = req.body.postTitle;
      post.postDescription = req.body.postDescription;
      post.categoryIn = req.body.categoryIn;
      post.categoryInTitle = category.categoryName;
      post.save();
      res.redirect("/all-post");
})
app.get("/delete-post/:id",async (req,res)=>{
      await Post.findByIdAndRemove(req.params.id);
      res.redirect('/all-post');
})


app.get("/all-post", async (req,res)=>{
      const post = await Post.find({});
      const postCount = await Post.find().countDocuments();
      res.render("post/all-post",{post, postCount});
})


const port = 3000;
app.listen(port, () => {
  console.log(`sever ${port} portunda çalışmaya başladı`);
});
