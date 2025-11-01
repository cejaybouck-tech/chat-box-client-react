import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useChatState } from "../ChatContextProvider";
import { Spinner } from "@/components/ui/spinner";

function MessagesContainer() {
  const state = useChatState();
  const [message, setMessage] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.chatLog]);

  const sendMessage = () => {
    if (message === "") return;
    setIsSending(true);
    if (state.webSocket && state.isConnected && !state.isLoading) {
      state.webSocket.send(message);
      setMessage("");
    } else {
      console.log("Not connected to WebSocket server");
    }
    setIsSending(false);
  };

  const isConnected = () => {
    return state.webSocket && state.isConnected && !state.isLoading;
  };

  return (
    <section className="w-full h-full min-h-0 flex flex-col max-w-[800px]">
      {/* chat box */}
      <div
        className={`flex-1 min-h-0 overflow-y-scroll flex flex-col w-full border p-4 px-6 rounded-2xl ${
          isConnected() ? "" : "justify-center items-center"
        }`}
      >
        {isConnected() ? (
          state.chatLog.map((message, index) => {
            return (
              <div key={"message-" + index} className="flex gap-x-1 text-lg">
                <p className="font-bold">{`${message.chatterName}:`}</p>
                <p>{message.message}</p>
              </div>
            );
          })
        ) : (
          <p className="text-neutral-600">Please Sign in to start chatting.</p>
        )}
        <div ref={messagesEndRef} />
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
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button
            onClick={sendMessage}
            className="flex items-center gap-x-2 p-2 bg-blue-500 text-white mt-2 rounded-2xl border hover:border-blue-800"
          >
            <Spinner className={isSending ? "opacity-100" : "opacity-0"} />
            <p className="text-lg">Send</p>
          </button>
        </div>
      )}
    </section>
  );
}

export default MessagesContainer;
