const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A category must have a name'],
        unique:[true,'A category must have a unique name'],
        trim: true,
        maxlength: [40, 'A category name must have less or equal then 40 characters'],
        minlength: [5, 'A category name must have more or equal then 5 characters'],
    },
    slug: String,
    // description: {
    //     type: String,
    //     required: [true, 'A category must have a description'],
    //     trim: true,
    //     maxlength: [200, 'A category description must have less or equal then 200 characters'],
    //     minlength: [10, 'A category description must have more or equal then 10 characters'],
    // }
    
    image :{
        type:String,
        // required:[true,'A category must have a image']
    }
    
},{timestamps:true});
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;