import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

function Register({
  rooms,
  setRooms,
  users,
  setUsers,
  curRoom,
  setCurRoom,
  curUser,
  setCurUser,
}) {
  const [isCreateRoom, setIsCreateRoom] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [roomInput, setRoomInput] = useState("");
  const navigate = useNavigate();

  function selectRoom(e) {
    const selectedRoomId = e.target.value;
    const selectedRoom = rooms.find((room) => room.roomId == selectedRoomId);
    setCurRoom(selectedRoom);
  }

  function addRoom() {
    setRooms((prevRooms) => [
      ...prevRooms,
      {
        roomId: v4(),
        roomName: roomInput,
        isGroupChat: true,
        users: [],
        chat: [],
      },
    ]);
    setIsCreateRoom(false);
  }

  function joinRoom() {
    setCurUser({
      userId: v4(),
      userName: userInput,
      partOfChats: [...curUser.partOfChats, curRoom],
    });
    setUsers((prevUsers) => [...prevUsers, curUser]);

    navigate(`/chatroom`);
  }
  if (isCreateRoom) {
    return (
      <div className="flex flex-col items-center gap-4 pt-4">
        <div className="text-2xl">Surf Chat</div>
        <input
          className="border text-xl w-3/4"
          type="text"
          placeholder="Enter room name"
          value={roomInput}
          onChange={(e) => setRoomInput(e.target.value)}
        />
        <button
          onClick={addRoom}
          className="bg-blue-600 hover:bg-blue-500 text-white py-1 px-3 text-xl rounded-md"
        >
          Submit
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-4 pt-4">
      <div className="text-2xl">Surf Chat</div>
      <input
        className="border text-xl w-3/4"
        type="text"
        placeholder="Enter your name"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <select
        value={curRoom.roomId}
        onChange={selectRoom}
        className="border text-lg"
      >
        {rooms.map((room, index) => {
          return (
            <option value={room.roomId} key={index}>
              {room.roomName}
            </option>
          );
        })}
      </select>
      <div className="flex gap-4">
        <button
          onClick={() => setIsCreateRoom(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white py-1 px-3 text-xl rounded-md"
        >
          Create Room
        </button>
        <button
          onClick={joinRoom}
          className="bg-blue-600 hover:bg-blue-500 text-white py-1 px-3 text-xl rounded-md"
        >
          Join
        </button>
      </div>
    </div>
  );
}

export default Register;
