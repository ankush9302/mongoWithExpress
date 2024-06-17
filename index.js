const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Chat=require("./models/chat");
const methodOverride=require("method-override");
const ExpressError=require("./ExpressError");


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main().then(()=>{console.log("connection establised");

}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');

}

//index route

app.get("/chats",async (req,res)=>{
  try{
let chats=await Chat.find();
  //console.log(chats);
  res.render("index.ejs",{chats});
  }catch(err){
    next(err);
  }
  
});

//new route
app.get("/chats/new",(req,res)=>{
  // throw new ExpressError(404,"page not found try something different");
   res.render("newchat.ejs");
});

//create Route
app.post("/chats",async (req,res,next)=>{
          try{
                let{from,to,msg}=req.body;
              let newChat = new Chat({
                from:from,
                to:to,
                msg:msg,
                created_at: new Date()
              });
               await newChat.save();
               res.redirect("/chats");
          }catch(err){
            next(err);
          }
          
    
});

function asyncWrap(fn)
{
  return function(req,res,next){
    fn(req,res,next).catch((err)=>next(err));
  }
}

//NEW-- show Route to learn error handlilng 
app.get("/chats/:id",asyncWrap(async(req,res,next)=>{

      let {id}=req.params;
      let chat =await Chat.findById(id);
      res.render("edit.ejs",{chat});
  
 
}));


//Edit Route
app.get("/chats/:id/edit",async (req,res)=>{
  try{
        let {id}=req.params;
          let chat=await Chat.findById(id);
        res.render("edit.ejs",{chat});
  }catch(err)
  {
    next(err);
  }
  
});

//update route
app.put("/chats/:id",async (req,res)=>{
  try{
         let {id}=req.params;
          let {msg:newmsg}=req.body;
          console.log(newmsg);
          let updated_chat= await Chat.findByIdAndUpdate(id,
            {msg:newmsg},
            {runValidators:true,new:true}
          );
          console.log(updated_chat);
          res.redirect("/chats")
  }catch(err){
    next(err);
  }
 
});

//Destroy route

app.delete("/chats/:id",async (req,res)=>{
  try{
      let {id}=req.params;
      let deletedchat=await Chat.findByIdAndDelete(id);
      console.log(deletedchat);
      res.redirect("/chats");
  }catch(err){
    next(err);
  }
 
});

app.use((err,req,res,next)=>{
  console.log(err.name);
  if(err.name=="ValidationError"){
    console.log("This was a Validation error.Please follow rules");
  }
  next(err)
})
app.get("/",(req,res)=>{
    res.send("root is working");
})

//Error Handling Middleware
app.use((err,req,res)=>{
  let {status=500,message="something went wrong"}=err;
  res.status(status).send(message);
})

app.listen(8080,()=>{
    console.log("server is listening on port 8080");
});