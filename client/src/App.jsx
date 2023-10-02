import { useState, useEffect } from "react";
import "./App.css";
import socketioclient from "socket.io-client";
import pkmnTrainers from "./data";

const ENDPOINT = "http://localhost:3000";
let socket;

function App() {
  const [username] = useState(
    pkmnTrainers[Math.floor(Math.random() * pkmnTrainers.length)]
  );
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket = socketioclient(ENDPOINT);

    socket.emit("new-user", username);

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

    return () => {
      socket.off("chat-message");
      socket.off("user-connected");
      socket.off("user-disconnected");
    };
  }, []);

  return (
    <main>
      <h1>Neo Chat App React</h1>
      <Chatbox chat={chat} />
      <Sendbox message={message} setMessage={setMessage} setChat={setChat} />
    </main>
  );
}

function Chatbox({ chat }) {
  return (
    <div className="chat-container">
      <div className="msg left">I choose you Bulbasaur</div>
      <div className="msg right">I choose you Charmander</div>
      {chat.map((msg, index) => {
        return (
          <div key={index} className={`msg ${msg.dir}`}>
            {msg.message}
          </div>
        );
      })}
    </div>
  );
}

function Sendbox({ message, setMessage, setChat }) {
  function writeMessage(e) {
    const curMessage = e.target.value;
    setMessage(curMessage);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setChat((prevChat) => [
      ...prevChat,
      { message: "You: " + message, dir: "right" },
    ]);
    socket.emit("send-chat-message", message);
    setMessage("");
  }
  return (
    <form className="send-container">
      <input
        type="text"
        placeholder="Enter message"
        value={message}
        onChange={writeMessage}
      />
      <button onClick={handleSubmit}>Send</button>
    </form>
  );
}

export default App;
