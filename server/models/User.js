const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({

    email:{
        type: String,
        required: 'This field is required.'
    },
    password:{
        type: String,
        required: 'This field is required.'
    },
});

//export Schema
module.exports=mongoose.model('User',userSchema);
//collection name and export schema