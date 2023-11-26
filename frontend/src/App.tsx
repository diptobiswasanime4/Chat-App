import { useState, useEffect } from "react";
import socketioclient from "socket.io-client";
import pkmnTrainers from "./data";
import { Routes, Route } from "react-router-dom";

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
    <div className="flex flex-col items-center gap-4 pt-4 pb-16 bg-green-100">
      <div className="text-2xl">Surf Chat Dev</div>
      <Chatbox chat={chat} typingUser={typingUser} dotCount={dotCount} />
      <Sendbox
        username={username}
        message={message}
        setMessage={setMessage}
        setChat={setChat}
      />
    </div>
  );
}

function Chatbox({ chat, typingUser, dotCount }) {
  return (
    <div className="bg-yellow-200 flex flex-col gap-2 p-2 overflow-y-auto w-2/3 h-[300px] rounded-lg shadow-lg border-2 border-black">
      <div className="bg-orange-500 text-white p-1 rounded-md w-2/3 mr-auto">
        I choose you Bulbasaur
      </div>
      <div className="bg-orange-500 text-white p-1 rounded-md w-2/3 ml-auto">
        I choose you Charmander
      </div>
      {chat.map((msg, index) => {
        return (
          <div
            key={index}
            className={`bg-orange-500 text-white p-1 rounded-md w-2/3 ${msg.dir}`}
          >
            {msg.message}
          </div>
        );
      })}
      {typingUser && (
        <div className="bg-orange-500 text-white p-1 rounded-md w-2/3 mr-auto">
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
    <form className="flex w-2/3 gap-2">
      <input
        className="w-full text-xl shadow-md rounded-md p-1"
        type="text"
        placeholder="Enter message"
        value={message}
        onChange={writeMessage}
      />
      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 w-1/4 text-white rounded-full text-xl shadow-md"
      >
        Send
      </button>
    </form>
  );
}

export default App;
