const mongoose=require('mongoose');
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true, useUnifiedTopology:true});

const db=mongoose.connection;

//check if connection is successful
db.on('error',console.error.bind(console,'Connection Err'));

//if it is
db.once('open',function(){
    console.log('Connected!');
})


//Models
require('./Category');
require('./Place');
require('./User');