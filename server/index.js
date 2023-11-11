const { v4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;

const { connect } = require("./db");
const Chat = require("./models/chat");
const mongoose = require("mongoose");

connect();

const io = require("socket.io")(PORT, {
  cors: {
    origin: "*",
  },
});

let users = {};

io.on("connection", (socket) => {
  let roomId = v4();
  const ChatDoc = new Chat({
    roomId: roomId,
    chat: [],
  });

  ChatDoc.save();

  // New User connected
  socket.on("new-user", (user) => {
    users[socket.id] = user;
    socket.broadcast.emit("user-connected", user);
  });

  // Chat message
  socket.on("send-chat-message", (data) => {
    const message = { user: users[socket.id], msg: data };
    const ChatDoc = Chat.findOneAndUpdate(
      {
        roomId: roomId,
      },
      {
        $push: { chat: message },
      },
      {},
      (err, data) => {
        if (err) {
          console.log("Error saving chat.", err);
        } else {
          console.log("Saved chat in DB.", data);
        }
      }
    );
    console.log(`${users[socket.id]}: ${data}`);
    socket.broadcast.emit("chat-message", {
      user: users[socket.id],
      msg: data,
    });
  });

  // User disconnected
  socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user) {
      socket.broadcast.emit("user-disconnected", user);
      delete users[socket.id];
    } else {
      console.log(`User with socket ID ${socket.id} does not exist`);
    }
  });

  // User Typing
  socket.on("typing", (user) => {
    socket.broadcast.emit("user-typing", user);
  });

  // User Stop Typing
  socket.on("stop-typing", (user) => {
    socket.broadcast.emit("user-stop-typing", user);
  });
});
