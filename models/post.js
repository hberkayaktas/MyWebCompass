const mongoose = require('mongoose');
const slugify=require('slugify'); 
const Schema = mongoose.Schema;

// Tablo oluşturma
const postShema = new Schema({
      postTitle: String,
      postDescription: String,
      categoryInTitle:String,
      dateCreated: {
            type: Date,
            default: Date.now,
      },
      Cuser:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
      },
      Uuser:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
      },
      categoryIn:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Category'
      },
      slug:{
            type:String,
            unique:true
      }
});

postShema.pre('validate', function(next){
      this.slug=slugify(this.postTitle,{
            lower:true,
            strict:true
      })
      next();
 })

const Post = mongoose.model('Post', postShema);
//                            burada photo collections ismi


module.exports = Post;