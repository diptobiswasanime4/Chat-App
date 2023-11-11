import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Chatroom from "./components/Chatroom";
import CreateRoom from "./components/CreateRoom";
import socketioclient from "socket.io-client";
import Home from "./components/Home";

const ENDPOINT = "http://localhost:3000";
let socket = socketioclient(ENDPOINT);

function App() {
  const [name, setName] = useState("");
  const [rooms, setRooms] = useState([]);
  const [roomInfo, setRoomInfo] = useState({
    roomId: "",
    roomName: "",
    isGroupChat: true,
  });

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            socket={socket}
            name={name}
            setName={setName}
            setRooms={setRooms}
            rooms={rooms}
          />
        }
      ></Route>
      <Route
        path="create-room"
        element={
          <CreateRoom
            roomInfo={roomInfo}
            setRoomInfo={setRoomInfo}
            socket={socket}
            setRooms={setRooms}
          />
        }
      ></Route>
      <Route
        path="chatroom"
        element={
          <Chatroom
            rooms={rooms}
            name={name}
            socket={socket}
            roomInfo={roomInfo}
          />
        }
      ></Route>
    </Routes>
  );
}

export default App;
