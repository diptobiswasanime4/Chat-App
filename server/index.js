// const { v4 } = require("uuid");
// const dotenv = require("dotenv");
// dotenv.config();
// const PORT = process.env.PORT || 3000;

// const { connect } = require("./db");
// const Chat = require("./models/chat");
// const mongoose = require("mongoose");

// connect();

// const io = require("socket.io")(PORT, {
//   cors: {
//     origin: "*",
//   },
// });

// let users = {};

// io.on("connection", (socket) => {
//   // Add Room
//   socket.on("new-room", async (data) => {
//     console.log(data);
//     const roomDoc = new Chat({
//       roomId: data.roomId,
//       roomName: data.roomName,
//       isGroupChat: data.isGroupChat,
//       chat: [],
//       users: [],
//     });
//     await roomDoc.save();
//   });

//   // Existing Rooms
//   async function existingRooms() {
//     const rooms = await Chat.find({});
//     console.log("Rooms: ", rooms);
//     socket.emit("existing-rooms", rooms);
//   }
//   existingRooms();

//   // New User connected
//   socket.on("new-user", async (user) => {
//     console.log("User:", user);
//     users[socket.id] = user.name;
//     const ChatDoc = await Chat.findOneAndUpdate(
//       {
//         roomId: user.roomId,
//       },
//       {
//         $push: { users: user.name },
//       }
//     );
//     socket.broadcast.emit("user-connected", user);
//   });

//   // Chat message
//   socket.on("send-chat-message", (data) => {
//     console.log("Sendchatmessage:", data);
//     const message = { user: users[socket.id], msg: data.message };
//     // const ChatDoc = Chat.findOneAndUpdate(
//     //   {
//     //     roomId: roomId,
//     //   },
//     //   {
//     //     $push: { chat: message },
//     //   },
//     //   {}
//     // );
//     console.log(`${users[socket.id]}: ${data.message}`);
//     socket.broadcast.emit("chat-message", {
//       user: users[socket.id],
//       msg: data.message,
//     });
//   });

//   // User disconnected
//   socket.on("disconnect", () => {
//     const user = users[socket.id];
//     if (user) {
//       socket.broadcast.emit("user-disconnected", user);
//       delete users[socket.id];
//     } else {
//       console.log(`User with socket ID ${socket.id} does not exist`);
//     }
//   });

//   // User Typing
//   socket.on("typing", (user) => {
//     socket.broadcast.emit("user-typing", user);
//   });

//   // User Stop Typing
//   socket.on("stop-typing", (user) => {
//     socket.broadcast.emit("user-stop-typing", user);
//   });
// });
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const io = require("socket.io")(PORT, {
  cors: {
    origin: "*",
  },
});

let users = [];
let rooms = [];

io.on("connection", async (socket) => {
  socket.emit("first-message", "This is the first message from server.");
});
