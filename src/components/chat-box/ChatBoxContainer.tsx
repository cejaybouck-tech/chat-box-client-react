import MessagesContainer from "./messages/MessagesContainer";
import ConnectionsContainer from "./connections/ConnectionsContainer";

function ChatBoxContainer() {
  return (
    <section className="flex flex-col justify-between w-full flex-1 min-h-0 overflow-hidden h-full">
      <div className="w-full flex justify-center flex-1 min-h-0 overflow-hidden h-full">
        <MessagesContainer />
      </div>
      <div className="w-full flex justify-center flex-none mt-4">
        <ConnectionsContainer />
      </div>
    </section>
  );
}

export default ChatBoxContainer;
