import React from "react";
import Chatbox from "./Chatbox";
import Sendbox from "./Sendbox";

function Chatroom({
  rooms,
  setRooms,
  users,
  setUsers,
  curRoom,
  setCurRoom,
  curUser,
  setCurUser,
}) {
  return (
    <div className="flex flex-col items-center bg-blue-100 gap-4 pt-4 pb-16 w-full">
      <div className="text-2xl">Surf Chat</div>
      <Chatbox />
      <Sendbox />
    </div>
  );
}

export default Chatroom;
