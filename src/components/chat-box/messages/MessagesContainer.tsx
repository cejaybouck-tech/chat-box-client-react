import React, { useState, type ChangeEvent } from "react";
import { useChatState } from "../ChatContextProvider";

function MessagesContainer() {
  const state = useChatState();
  const [message, setMessage] = useState<string>("");

  const serverURL = import.meta.env.ServerURL;

  const sendMessage = () => {
    if (state.webSocket && state.isConnected && !state.isLoading) {
      state.webSocket.send(message);
      setMessage("");
    } else {
      console.log("Not connected to WebSocket server");
    }
  };

  return (
    <section className="w-full h-full flex flex-col max-w-[800px]">
      {/* chat box */}
      <div className="overflow-y-scroll flex flex-col w-full border h-full max-h-[800px] p-4 md:p-8 lg:p-16 rounded-2xl">
        <p className="text-neutral-600">Please Sign in to start chatting.</p>
      </div>
      {!state.isLoading && (
        <div className="flex flex-col">
          <label htmlFor="chat-input" className="mt-4 pl-2 text-lg hidden">
            Chat Input
          </label>
          <textarea
            id="chat-input"
            cols={3}
            className="border rounded-2xl mt-2 p-2 resize-none"
            value={message}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              setMessage(event.currentTarget.value);
            }}
          />
          <button className="p-2 bg-blue-500 text-white mt-2 rounded-2xl">
            Send
          </button>
        </div>
      )}
    </section>
  );
}

export default MessagesContainer;
