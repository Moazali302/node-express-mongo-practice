const fs = require('fs').promises;
const { resolve } = require('path');
const {await}=require ("path");
 
                       //writeFIle 

// fs.writeFile("index.txt", "Hey how are you ", function(err){
//    if(err){
//     return console.error(err);
//    }
//    else{
//     console.log("Done");
//    }
// })

                    //Append File 

// fs.appendFile("index.txt","Ma thiek hu ap sunao ap kasy hain",function(err){
//     if(err){return console.error(err);}
//     else{
//         return console.log("append is worked");
//     }
// })

        //Rename File 

// fs.rename("index.txt","Hello.txt",function(err){
//      if(err){return console.error(err);}
//     else{
//         return console.log("Rename Succesfully");
//     }
// })
  
                  //Copy File 

// fs.copyFile("Hello.txt","./copy/copy.txt",function(err){
//     if(err){
//          return console.error(err.message);
//     }
//     else
//         return console.log("Copy succesfully");
// })
     
      //delete file

// fs.unlink("./copy/copy.txt",function(err){
//     if(err){
//         return console.error(err.message);
//     }
//     else{
//         return console.log("File deleted successfully");
//     }
// })
  
     //delete folder


    //  fs.rmdir("./copy",function(err){
    //     if(err) console.error(err.message);
    //     else{
    //         console.log("removed");
    //     }
    //  })

                         //Read Files

    //   fs.readFile("Hello.txt", "utf-8" ,function(err,Data){
    //     if(err){
    //         return console.error(err.message)
    //     }
    //     else{
    //         return console.log(Data);
    //     }
    //   });
    //   console.log("Reading File.....")

  
        ///Read Data using promises;
    

    // const fs = require("fs").promises;
// async function readFile() {
//   try {
//     const data = await fs.readFile("Hello.txt", "utf8");
//     console.log(data);
//   } catch (err) {
//     console.error("Error reading file:", err);
//   }
// }

// readFile();
// console.log("Reading File......")


                       //create server


// const http=require("http");

//  const server= http.createServer(function(req,res){
//     res.end("Hello Muaz");
// })
// server.listen(3000);
 
        //Express.js 


const express = require("express");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const path = require("path");
const { name } = require('ejs');
// const session = require("express-session");

const app = express();
let PORT = 4000; // default port

               // Middlewares

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());

              // Session middleware

// app.use(session({
//   secret: "mySecretKey",        // secret key for session encryption
//   resave: false,
//   saveUninitialized: true,
//   cookie: { maxAge: 60000 }     // session expiry = 1 minute
// }));

               // Routes

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// app.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   if (username === "Admin" && password === "123") {

              // Save in cookie

//     res.cookie("username", username, { maxAge: 700000, httpOnly: true });

             // Save in session

//     req.session.user = username;

//     res.send(`Login successful 
//               <br><a href='/profile'>Go to Profile</a>`);
//   } else {
//     res.send("Invalid credentials  <br><a href='/'>Try Again</a>");
//   }
// });

// app.get("/profile", (req, res) => {

             // Check session first

//   if (req.session.user) {
//     res.send(`Hello ${req.session.user}, (from SESSION) Welcome Back! 
//               <br><a href='/logout'>Logout</a>`);
//   } 
            // Fallback: check cookie if session expired

//   else if (req.cookies.username) {
//     res.send(`Hello ${req.cookies.username}, (from COOKIE) Welcome Back! 
//               <br><a href='/logout'>Logout</a>`);
//   } 
//   else {
//     res.send("No session/cookie found  <br><a href='/'>Login</a>");
//   }
// });

// app.get("/logout", (req, res) => {
//   res.clearCookie("username");

                 // Destroy session

//   req.session.destroy(() => {
//     res.send("Logged out  (Session + Cookie cleared) <br><a href='/'>Login again</a>");
//   });
// });

// 404 handler

// app.use((req, res) => {
//   res.status(404).send("Page not found");
// });


    // EJS, Dynamic Routing & Project Setup 

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set('view engine , ejs ');
app.set("views", path.join(__dirname, "views")); 

app.get("/",(req,res)=>{
    res.render("index.ejs",{name:"Muaz"});
})
  const users=[
  { id: 1, username: "muaz", name: "Muaz Jutt", followers: 1800, bio: "Backend Developer" },
  { id: 2, username: "ali", name: "Adil Butt", followers: 200, bio: "Frontend Developer" },
  { id: 3, username: "saif", name: "Saif Rajpoot", followers: 90, bio: "UI/UX Designer" }
];
  app.get("/users",(req,res)=>{
    res.render("user.ejs",{users});
  });
  app.get("/profile/:username",(req,res)=>{
    const user=users.find(u=>u.username === req.params.username);
    if(user){
        res.render("profile.ejs",{user});
    }
    else{
        res.render("error.ejs",{username:req.params.username});
    }
  })









































// Function to start server
function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${port} busy, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error(err);
    }
  });
}

// Start server with auto-port finder

startServer(PORT);



