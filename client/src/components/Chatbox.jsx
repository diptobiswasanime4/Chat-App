import React from "react";

function Chatbox() {
  return (
    <div className="w-3/4 h-[300px] border-2 border-black bg-yellow-200 flex flex-col gap-2 px-2 py-4">
      <div className="mr-auto w-2/3 bg-green-500 p-1 rounded-lg text-lg">
        I choose you Bulbasaur
      </div>
      <div className="ml-auto w-2/3 bg-green-500 p-1 rounded-lg text-lg">
        I choose you Charmander
      </div>
    </div>
  );
}

export default Chatbox;
