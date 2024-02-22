const mongoose=require('mongoose');

const categorySchema=new mongoose.Schema({

    name:{
        type: String,
        required: 'This field is required.'
    },
    image:{
        type: String,
        required: 'This field is required.'
    },
});

//export Schema
module.exports=mongoose.model('Category',categorySchema);