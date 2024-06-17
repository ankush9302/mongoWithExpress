# MongoDB with Express Chat Application

## Overview
This project is a simple chat application built using Node.js, Express, MongoDB, and Mongoose. It allows users to create, read, update, and delete chat messages. The application uses EJS as the templating engine and follows the MVC (Model-View-Controller) architectural pattern.

## Features
- View all chat messages
- Create a new chat message
- Edit an existing chat message
- Delete a chat message

## Prerequisites
Make sure you have the following installed on your system:
- Node.js
- MongoDB

## Installation
1. Clone the repository to your local machine:
   ```bash
   https://github.com/ankush9302/mongoWithExpress.git
   cd mongowithExpress
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start your MongoDB server. If you have MongoDB installed locally, you can start it using:
   ```bash
   mongod
   ```

4. Run the application:
   ```bash
   node index.js
   ```

5. Open your web browser and navigate to:
   ```
   http://localhost:8080
   ```

## Project Structure
```
mongowithexpress/
│
├── models/
│   └── chat.js             # Mongoose schema for Chat
│
├── public/
│   └── (static files)
│
├── views/
│   ├── index.ejs           # View for listing all chats
│   ├── newchat.ejs         # View for creating a new chat
│   ├── edit.ejs            # View for editing a chat
│
├── index.js                # Main application file
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
```

## Usage

### Viewing All Chats
Navigate to `/chats` to view all chat messages. This will display a list of all chats stored in the MongoDB database.

### Creating a New Chat
Navigate to `/chats/new` to access the form for creating a new chat message. Fill in the required fields and submit the form to create a new chat.

### Editing a Chat
To edit a chat message, navigate to `/chats/:id/edit` where `:id` is the ID of the chat message you want to edit. Update the message content and submit the form to save the changes.

### Deleting a Chat
To delete a chat message, click the delete button associated with the chat message you want to remove. This will delete the chat from the database.

## Code Explanation

### Database Connection
The application connects to a MongoDB database named `whatsapp` using Mongoose:
```javascript
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
main().then(() => { console.log("connection established"); }).catch(err => console.log(err));
```

### Routes
- **Index Route**: Displays all chat messages.
  ```javascript
  app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats });
  });
  ```
- **New Route**: Displays the form for creating a new chat message.
  ```javascript
  app.get("/chats/new", (req, res) => {
    res.render("newchat.ejs");
  });
  ```
- **Create Route**: Handles the creation of a new chat message.
  ```javascript
  app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
      from: from,
      to: to,
      msg: msg,
      created_at: new Date()
    });

    newChat.save().then(res => {
      console.log("chat saved");
    }).catch((err) => {
      console.log(err);
    });
    res.redirect("/chats");
  });
  ```
- **Edit Route**: Displays the form for editing a chat message.
  ```javascript
  app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
  });
  ```
- **Update Route**: Handles updating an existing chat message.
  ```javascript
  app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg: newmsg } = req.body;
    let updated_chat = await Chat.findByIdAndUpdate(id, { msg: newmsg }, { runValidators: true, new: true });
    res.redirect("/chats");
  });
  ```
- **Delete Route**: Handles deleting a chat message.
  ```javascript
  app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let deletedchat = await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
  });
  ```

### Models
The Chat model defines the schema for chat messages:
```javascript
const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
  from: String,
  to: String,
  msg: String,
  created_at: { type: Date, default: Date.now }
});
const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
```

## Dependencies
- **express**: Web framework for Node.js
- **ejs**: Embedded JavaScript templating
- **method-override**: Middleware for overriding HTTP methods
- **mongoose**: MongoDB object modeling tool

## License
This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## Author
Ankush Kurmi

Feel free to modify and enhance the project as per your requirements. Happy coding!
