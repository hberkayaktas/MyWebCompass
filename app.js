const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore=require('connect-mongo');
const flash = require('connect-flash');
const ejs = require("ejs");
const Category = require("./models/category");
const Post = require("./models/post");
const User = require("./models/user");
const pageRoute = require("./routes/pageRoute");
const adminRoutes = require("./routes/adminRoute");

// Uygulama oluştururuz
const app = express();

//database bağlantısı
//connectStringB = "mongodb://localhost/mywebcompass-db";
connectStringB = "mongodb+srv://hberkayaktas:MWXtPX5PHyA85WZ3@cluster0.ktfue.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connectStringB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Wiew engine
app.set("view engine", "ejs");

//Global Variable
global.userIN = null;
global.userRole = null;
global.userName_g = null;

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
  userRole = req.session.userRole;
  userName_g = req.session.userName_g;
  next();
});
app.use(flash());
app.use((req, res, next) =>{
  res.locals.flashMessages=req.flash();
  next();
})
                           



//routes
app.use("/admin", adminRoutes);
app.use("/", pageRoute);

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
