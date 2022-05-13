const mongoose = require('mongoose');
const slugify=require('slugify'); 


const Schema = mongoose.Schema;

// Tablo oluşturma
const categoryShema = new Schema({
      categoryName: String,
      icon: String,
      iconB: String,
      dateCreated: {
            type: Date,
            default: Date.now,
      },
      slug:{
            type:String,
            unique:true
      }
});

categoryShema.pre('validate', function(next){
      this.slug=slugify(this.categoryName,{
            lower:true,
            strict:true
      })
      next();
 })

const Category = mongoose.model('Category', categoryShema);
//                            burada photo collections ismi


module.exports = Category;