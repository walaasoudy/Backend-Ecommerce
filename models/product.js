const mongoose = require('mongoose');
const Schema = mongoose.Schema({

     name:{
        type : string,
        required:true,
        trim:true,
        minlength:[3,'Too short product name'],
},
    slug:{
       type:string,
       lowercase:true,
},
    description:{
     type:string,
     required:true,
     minlength:[20,'Too short product description'],
    maxlength:[200,'Too long product description']
}

},
{ timestamps:true}

    
)

const Product = mongoose.model('Product',Schema);
module.exports = Product;