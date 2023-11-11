import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

function Home({ name, setName, rooms, setRooms, socket }) {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);

  function submitName() {
    const roomDetails = rooms.find((room) => room.roomName == selectedRoom);
    console.log(roomDetails);
    socket.emit("new-user", { name, ...roomDetails });
    navigate(`/chatroom`);
  }

  useEffect(() => {
    socket.on("existing-rooms", (data) => {
      setRooms(data);
    });
  }, []);

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
        <option>Select a room</option>
        {rooms.map((room, index) => (
          <option key={index} value={room}>
            {room.roomName}
          </option>
        ))}
      </select>
      <div className="flex gap-4">
        <div
          onClick={(e) => navigate("/create-room")}
          className="bg-blue-600 hover:bg-blue-500 py-1 px-3 rounded-md cursor-pointer text-white text-xl"
        >
          Create Room
        </div>
        <div
          onClick={submitName}
          className="bg-blue-600 hover:bg-blue-500 py-1 px-3 rounded-md cursor-pointer text-white text-xl"
        >
          Join
        </div>
      </div>
    </div>
  );
}

export default Home;
