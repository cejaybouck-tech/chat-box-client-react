import "./App.css";
import ChatBoxContainer from "./components/chat-box/ChatBoxContainer";
import ChatContextProvider from "./components/chat-box/ChatContextProvider";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

function App() {
  return (
    <main className="h-dvh w-full p-2 md:p-10 lg:p-20">
      <Card className="w-full h-full rounded-xl flex flex-col items-center">
        <CardHeader className="w-full text-center">
          <CardTitle className="text-3xl">Welcome to basic chat box!</CardTitle>
        </CardHeader>
        <CardContent className="w-full p-4 flex-1 min-h-0 overflow-hidden">
          <ChatContextProvider>
            <ChatBoxContainer />
          </ChatContextProvider>
        </CardContent>
      </Card>
    </main>
  );
}

export default App;
