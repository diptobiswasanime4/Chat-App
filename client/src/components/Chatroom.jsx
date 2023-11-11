import React, { useState, useEffect } from "react";
import Chatbox from "./Chatbox";
import Sendbox from "./Sendbox";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Home from "./Home";

function Chatroom({ rooms, socket, name, roomInfo }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typingUser, setTypingUser] = useState("");
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prevCount) => (prevCount % 3) + 1);
    }, 500);

    socket.on("user-connected", (user) => {
      setChat((prevChat) => [
        ...prevChat,
        { message: `${user.name} joined the chat`, dir: "left" },
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
      <div className="text-2xl py-4">Neo Chat App React</div>
      <Chatbox chat={chat} typingUser={typingUser} dotCount={dotCount} />

      <Sendbox
        socket={socket}
        name={name}
        message={message}
        setMessage={setMessage}
        setChat={setChat}
        roomInfo={roomInfo}
      />
    </main>
  );
}

export default Chatroom;
