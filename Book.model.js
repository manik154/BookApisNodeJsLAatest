var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//model help u communicate with database
//


var BookSchema = new Schema({
  id:String,
  title: 
  {
    type: String,
    required: "Title is required"

  },
  author: {  
      type: String,
  //  required: "Author is required"
},
  category:  {   type: String,
 // required: "Category is required"
  },
  image:{   type: String,
    required: "image is required"
    },
  description: {
    type: String,
    required: "Description is required",
  },
  versionKey: false   //it unecessary crreates a column name '_v' wjhich states the version of it...
               //just set it false if you dont wan this extra column to be made
});

module.exports = mongoose.model('Book', BookSchema);