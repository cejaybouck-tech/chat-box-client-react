import MessagesContainer from "./messages/MessagesContainer";
import ConnectionsContainer from "./connections/ConnectionsContainer";

function ChatBoxContainer() {
  return (
    <section className="flex flex-col items-center w-full h-full">
      <MessagesContainer />
      <ConnectionsContainer />
    </section>
  );
}

export default ChatBoxContainer;
