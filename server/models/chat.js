const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  roomId: String,
  roomName: String,
  isGroupChat: Boolean,
  chat: [String],
  users: [String],
});

const Chat = mongoose.model("chat", ChatSchema);

module.exports = Chat;
