import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Chatroom from "./components/Chatroom";
import socketioclient from "socket.io-client";
import Home from "./components/Home";

const ENDPOINT = "http://localhost:3000";
let socket = socketioclient(ENDPOINT);

function App() {
  const [name, setName] = useState("");
  return (
    <Routes>
      <Route path="/" element={<Home name={name} setName={setName} />}></Route>
      <Route
        path="chatroom"
        element={<Chatroom name={name} socket={socket} />}
      ></Route>
    </Routes>
  );
}

export default App;
