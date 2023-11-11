const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  roomId: String,
  chat: [String],
});

const Chat = mongoose.model("chat", ChatSchema);

module.exports = Chat;
