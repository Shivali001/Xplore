const mongoose=require('mongoose');

const placeSchema=new mongoose.Schema({

    name:{
        type: String,
        required: 'This field is required.'
    },
    description:{
        type: String,
        required: 'This field is required.'
    },
    address:{
        type: String,
        required: 'This field is required.'
    },
    category:{
        type: String,
        enum: ['Food','Historical Monuments','Park','Market','Museum','Waterfall','Zoo','Stadium','Games'],
        required: 'This field is required.'
    },
    special_notes:{
        type: String,
    },
    image:{
        type: String,
        required: 'This field is required.'
    },
    email:{
        type: String,
        required: 'This field is required.'
    },
    likes:{
        type:Number,
        default:0
    }
});

placeSchema.index({address:'text',category:'text'});

//export Schema
module.exports=mongoose.model('Place',placeSchema);