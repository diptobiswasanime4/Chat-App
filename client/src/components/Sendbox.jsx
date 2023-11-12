import React from "react";

function Sendbox() {
  return (
    <div className="flex gap-2 w-3/4">
      <input
        className="text-lg w-full"
        type="text"
        placeholder="Enter message"
      />
      <button className="bg-blue-600 hover:bg-blue-500 text-white py-1 px-3 text-lg rounded-md">
        Send
      </button>
    </div>
  );
}

export default Sendbox;
