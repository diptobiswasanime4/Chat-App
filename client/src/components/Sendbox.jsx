import React from "react";

function Sendbox({ socket, name, message, setMessage, setChat, roomInfo }) {
  function writeMessage(e) {
    const curMessage = e.target.value;
    setMessage(curMessage);
    if (curMessage == "") {
      socket.emit("stop-typing", name);
    } else {
      socket.emit("typing", name);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    setChat((prevChat) => [
      ...prevChat,
      { message: "You: " + message, dir: "right" },
    ]);
    socket.emit("send-chat-message", { ...roomInfo, message });
    setMessage("");
    socket.emit("stop-typing", name);
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

export default Sendbox;
