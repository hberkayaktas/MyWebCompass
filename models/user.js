const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

// Tablo oluşturma
const userShema = new Schema({
  name: String,
  userName: String,
  password: String,
  email: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});
userShema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;

      next();
    });
  });
});

const User = mongoose.model("User", userShema);
//                            burada photo collections ismi

module.exports = User;
