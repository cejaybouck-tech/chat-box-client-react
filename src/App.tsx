import "./App.css";
import ChatBoxContainer from "./components/chat-box/ChatBoxContainer";
import ChatContextProvider from "./components/chat-box/ChatContextProvider";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

function App() {
  return (
    <main className="h-screen w-full p-2 md:p-10 lg:p-20">
      <Card className="w-full h-full rounded-xl flex flex-col items-center bg-neutral-1 00">
        <CardHeader className="w-full text-center">
          <CardTitle className="text-3xl">Welcome to basic chat box!</CardTitle>
        </CardHeader>
        <CardContent className="w-full h-full p-4">
          <ChatContextProvider>
            <ChatBoxContainer />
          </ChatContextProvider>
        </CardContent>
      </Card>
    </main>
  );
}

export default App;
