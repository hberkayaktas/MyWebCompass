const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore=require('connect-mongo');
const ejs = require("ejs");
const Category = require("./models/category");
const Post = require("./models/post");
const User = require("./models/user");
const pageRoute = require("./routes/pageRoute");
const adminRoutes = require("./routes/adminRoute");

// Uygulama oluştururuz
const app = express();

//database bağlantısı
connectStringB = "mongodb://localhost/mywebcompass-db";
mongoose.connect(connectStringB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Wiew engine
app.set("view engine", "ejs");

//Global Variable
global.userIN = null;

//Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "smartEdu_session_string",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: connectStringB }),
  })
);
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});




//routes
app.use("/", pageRoute);
app.use("/admin", adminRoutes);

/*
app.get("/all-category",)
app.get("/update-category/:id", )
app.post("/update-category/:id", )
app.get("/delete-category/:id",)
app.get("/add-post", );
app.post("/add-post", );
app.get("/update-post/:id", )
app.post("/update-post/:id", )
app.get("/delete-post/:id",)
app.get("/post-detail/:id",)
app.get("/all-post", )
*/

const port = 3000;
app.listen(port, () => {
  console.log(`sever ${port} portunda çalışmaya başladı`);
});
