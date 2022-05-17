const User = require("../models/user");
const { body } = require("express-validator");

exports.registerValidator = [
      body("name").not().isEmpty().withMessage("Please Enter your Name <br>"),
      body("email")
        .isEmail()
        .withMessage("Please Enter Valid Email <br>")
        .custom((userEmail) => {
          return User.findOne({ email: userEmail }).then((user) => {
            if (user) {
              return Promise.reject("Email is already exists! <br>");
            }
          });
        }),
      body("password").not().isEmpty().withMessage("Please EnterAPassword <br>"),
    ];