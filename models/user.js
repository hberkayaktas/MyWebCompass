const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Tablo oluşturma
const userShema = new Schema({
      name: String,
      userName: String,
      password: String,
      email:String,
      dateCreated: {
            type: Date,
            default: Date.now,
      },
});

const User = mongoose.model('User', userShema);
//                            burada photo collections ismi


module.exports = User;