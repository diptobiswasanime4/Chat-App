import React, { useState, useEffect } from "react";
import Chatbox from "./Chatbox";
import Sendbox from "./Sendbox";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Home from "./Home";

function Chatroom({ socket, name }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typingUser, setTypingUser] = useState("");
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prevCount) => (prevCount % 3) + 1);
    }, 500);

    socket.emit("room-id", id);

    socket.emit("new-user", name);

    socket.on("user-connected", (user) => {
      setChat((prevChat) => [
        ...prevChat,
        { message: `${user} joined the chat`, dir: "left" },
      ]);
    });

    socket.on("user-disconnected", (user) => {
      setChat((prevChat) => [
        ...prevChat,
        { message: `${user} left the chat`, dir: "left" },
      ]);
    });

    socket.on("chat-message", (data) => {
      setChat((prevChat) => [
        ...prevChat,
        { message: data.user + ": " + data.msg, dir: "left" },
      ]);
    });

    socket.on("user-typing", (user) => {
      setTypingUser(user);
    });

    socket.on("user-stop-typing", (user) => {
      if (typingUser == user) {
        setTypingUser("");
      }
    });

    return () => {
      clearInterval(interval);
      socket.off("chat-message");
      socket.off("user-connected");
      socket.off("user-disconnected");
      socket.off("user-typing");
      socket.on("user-stop-typing");
    };
  }, []);

  if (!name) {
    navigate("/");
  }

  return (
    <main>
      <h1>Neo Chat App React</h1>
      <Chatbox chat={chat} typingUser={typingUser} dotCount={dotCount} />

      <Sendbox
        socket={socket}
        name={name}
        message={message}
        setMessage={setMessage}
        setChat={setChat}
      />
    </main>
  );
}

export default Chatroom;
