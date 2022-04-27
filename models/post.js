const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Tablo oluşturma
const postShema = new Schema({
      postTitle: String,
      postDescription: String,
      categoryIn: String,
      categoryInTitle:String,
      dateCreated: {
            type: Date,
            default: Date.now,
      },
});

const Post = mongoose.model('Post', postShema);
//                            burada photo collections ismi


module.exports = Post;