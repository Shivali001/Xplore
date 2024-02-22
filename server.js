//Shivali Sharma
//3145782

const express=require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload=require('express-fileupload');
const session=require('express-session');
const cookieParser=require('cookie-parser');
const flash=require('connect-flash');
const bcrypt=require('bcrypt');
const path=require('path');

const app=express();
const port=3000;
//const port=process.env.PORT; If uploading website somewhere
require('dotenv').config();
app.use(express.urlencoded({extended:true}));//makes the data coming from the form readabel in req.body

//serving static files from /public directory as well
//app.use("/public", express.static(__dirname + "/public")); //I use /public in first parameter to access the 404 customized image when user gets file not found error inside the /public folder as well. 
app.use(express.static('public'));
app.use(expressLayouts);

app.use(cookieParser('XploreSecure'));
app.use(session({
    secret:'XploreSecretSession',
    saveUninitialized:true, // tells the middleware to save new sessions even if they haven't been modified during the request
    resave:true // forces the session to be saved back to the session store, even if the session was not modified during the request.
}));

app.use(flash());
app.use(fileUpload());



app.set('layout','./layouts/main');
const routes=require('./server/routes/xploreCity.js');
app.use('/',routes);
app.set('view engine','ejs');  








app.listen(port,()=>{
    console.log(`App listening on http://localhost:${port}`);
});