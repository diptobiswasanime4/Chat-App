import React from "react";

function Chatbox({ chat, typingUser, dotCount }) {
  return (
    <div className="chat-container">
      <div className="msg left">I choose you Bulbasaur</div>
      <div className="msg right">I choose you Charmander</div>
      {chat.map((msg, index) => {
        return (
          <div key={index} className={`msg ${msg.dir}`}>
            {msg.message}
          </div>
        );
      })}
      {typingUser && (
        <div className="msg left">
          {typingUser} is typing
          {dotCount == 1 ? "." : dotCount == 2 ? ".." : "..."}
        </div>
      )}
    </div>
  );
}

export default Chatbox;
