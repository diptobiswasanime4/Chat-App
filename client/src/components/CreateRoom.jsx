import React, { useEffect } from "react";
import { useState } from "react";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

function CreateRoom({ setRooms, socket, roomInfo, setRoomInfo }) {
  const navigate = useNavigate();

  function addRoom() {
    setRoomInfo({ ...roomInfo, roomId: v4() });
    console.log(roomInfo);
    setRooms((prevRooms) => [...prevRooms, roomInfo]);
    socket.emit("new-room", roomInfo);
    navigate("/");
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-3xl pt-4">Surf Chat</div>
      <input
        className="border text-xl"
        type="text"
        placeholder="Enter room name"
        value={roomInfo.roomName}
        onChange={(e) => setRoomInfo({ ...roomInfo, roomName: e.target.value })}
      />
      <div className="flex gap-4">
        <div
          onClick={addRoom}
          className="bg-blue-600 hover:bg-blue-500 py-1 px-3 rounded-md cursor-pointer text-white text-xl"
        >
          Join
        </div>
      </div>
    </div>
  );
}

export default CreateRoom;
