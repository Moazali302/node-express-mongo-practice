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
const { error } = require('console');
const app = express();


    // Middleware use 

app.use(function(req,res,next){
    console.log("Middleware is working");
    next();
})
// create routes

app.get("/", function (req, res) {
    res.send("Welcome to Home Screen");
});

app.get("/profile",function(req,res){
    res.send("My Name is moaz ");
});
  app.get("/about" ,function(req,res){
     res.json({name:"Moaz" , age:32});
  });

       //Error handling  

  app.get("/dashboard",function(req,res,next){
    return next(new Error("Dashboard is not found"));
  });
  app.use((error,req,res,next)=>{
   console.error(error.stack)
   res.status(404).send("Page not Found");
  });


app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});
