const Chat=require("./models/chat");
const mongoose=require("mongoose");

main().then(()=>{console.log("connection establised");

}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

let allChats = [
  {
    from: "neha",
    to: "priya",
    msg: "Hello Priya",
    created_at: new Date()  // UTC
  },
    {
    from: "Neha",
    to: "Priya",
    msg: "send me your exam sheets",
    created_at: new Date()  // UTC
  },
    {
    from: "Neha",
    to: "Priya",
    msg: "Hii Neha",
    created_at: new Date()  // UTC
  },
   {
    from: "Priya",
    to: "Neha",
    msg: "Sure, I will send it",
    created_at: new Date()  // UTC
  },
  {
    from: "Ankush",
    to: "Ankit",
    msg: "Hi Bhai kaisa hai,group Meeting at 5",
    created_at: new Date()  // UTC
  },

  {
    from: "Ankush",
    to: "Rohit",
    msg: "meeting at 5?",
    created_at: new Date()  // UTC
  },
 
  {
    from: "Rohit",
    to: "Ankush",
    msg: "Yes, see you then",
    created_at: new Date()  // UTC
  },
  {
    from: "Ankit",
    to: "Ankush",
    msg: "I'm good, how about you?",
    created_at: new Date()  // UTC
  },
  {
    from: "Ravi",
    to: "Suresh",
    msg: "Lunch at 1?",
    created_at: new Date()  // UTC
  }
];

Chat.insertMany(allChats);
