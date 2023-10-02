const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
  },
});

let users = {};

io.on("connection", (socket) => {
  // New User connected
  socket.on("new-user", (user) => {
    users[socket.id] = user;
    socket.broadcast.emit("user-connected", user);
  });

  // Chat message
  socket.on("send-chat-message", (data) => {
    socket.broadcast.emit("chat-message", {
      user: users[socket.id],
      msg: data,
    });
  });

  // User disconnected
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});
