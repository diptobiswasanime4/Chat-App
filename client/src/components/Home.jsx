import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

function Home({ name, setName }) {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState("");
  const [rooms, setRooms] = useState(["JS", "Python", "SQL"]);

  function submitName() {
    navigate(`/chatroom`);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-3xl pt-4">Surf Chat</div>
      <div className="text-2xl">Please Enter name</div>
      <input
        className="border text-xl"
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        className="text-xl border"
        value={selectedRoom}
        onChange={(e) => setSelectedRoom(e.target.value)}
      >
        {rooms.map((room, index) => (
          <option key={index} value={room}>
            {room}
          </option>
        ))}
      </select>
      <div
        onClick={submitName}
        className="bg-blue-600 hover:bg-blue-500 mt-4 py-1 px-3 rounded-md cursor-pointer text-white text-xl"
      >
        Join
      </div>
    </div>
  );
}

export default Home;
