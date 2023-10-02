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
  const [typingUser, setTypingUser] = useState("");
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prevCount) => (prevCount % 3) + 1);
    }, 500);

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

  return (
    <main>
      <h1>Neo Chat App React</h1>
      <Chatbox chat={chat} typingUser={typingUser} dotCount={dotCount} />
      <Sendbox
        username={username}
        message={message}
        setMessage={setMessage}
        setChat={setChat}
      />
    </main>
  );
}

function Chatbox({ chat, typingUser, dotCount }) {
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
      {typingUser && (
        <div className="msg left">
          {typingUser} is typing
          {dotCount == 1 ? "." : dotCount == 2 ? ".." : "..."}
        </div>
      )}
    </div>
  );
}

function Sendbox({ username, message, setMessage, setChat }) {
  function writeMessage(e) {
    const curMessage = e.target.value;
    setMessage(curMessage);
    if (curMessage == "") {
      socket.emit("stop-typing", username);
    } else {
      socket.emit("typing", username);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    setChat((prevChat) => [
      ...prevChat,
      { message: "You: " + message, dir: "right" },
    ]);
    socket.emit("send-chat-message", message);
    setMessage("");
    socket.emit("stop-typing", username);
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
