import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import socketioclient from "socket.io-client";
import { v4 } from "uuid";

import Register from "./components/Register";
import Chatroom from "./components/Chatroom";

const ENDPOINT = "http://localhost:3000";
let socket = socketioclient(ENDPOINT);

function App() {
  const [curUser, setCurUser] = useState({
    userId: "",
    userName: "",
    partOfChats: [],
  });
  const [curRoom, setCurRoom] = useState({
    roomId: "1",
    roomName: "Common",
    isGroupChat: true,
    chat: [],
    users: [],
  });
  const [rooms, setRooms] = useState([
    {
      roomId: "1",
      roomName: "Common",
      isGroupChat: true,
      chat: [],
      users: [],
    },
  ]);
  const [users, setUsers] = useState([]);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Register
            curRoom={curRoom}
            setCurRoom={setCurRoom}
            rooms={rooms}
            setRooms={setRooms}
            curUser={curUser}
            setCurUser={setCurUser}
            users={users}
            setUsers={setUsers}
          />
        }
      ></Route>
      <Route
        path="/chatroom"
        element={
          <Chatroom
            curRoom={curRoom}
            setCurRoom={setCurRoom}
            rooms={rooms}
            setRooms={setRooms}
            curUser={curUser}
            setCurUser={setCurUser}
            users={users}
            setUsers={setUsers}
          />
        }
      ></Route>
    </Routes>
  );
}

export default App;
