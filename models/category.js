const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Tablo oluşturma
const categoryShema = new Schema({
      categoryName: String,
      icon: String,
      dateCreated: {
            type: Date,
            default: Date.now,
      },
});

const Category = mongoose.model('Category', categoryShema);
//                            burada photo collections ismi


module.exports = Category;