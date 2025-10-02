const { name } = require('ejs');
const mongoos=require('mongoose');
mongoos.connect("mongodb://127.0.0.1:27017/Users")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
const userSchema= mongoos.Schema({
    name:String,
    age:Number,
    username:String,
    email:String
})
module.exports= mongoos.model("User",userSchema);