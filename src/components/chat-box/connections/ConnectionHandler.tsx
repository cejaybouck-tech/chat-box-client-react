import { useEffect } from "react";
import {
  useChatDispatch,
  useChatState,
  type ChatStateAction,
} from "../ChatContextProvider";
import { Spinner } from "@/components/ui/spinner";

function ConnectionHandler() {
  const chatState = useChatState();
  const dispatch = useChatDispatch();
  const serverURL = import.meta.env.VITE_ServerURL;

  useEffect(() => {
    let ws: WebSocket | null = null;

    const connect = () => {
      ws = new WebSocket(serverURL ?? "ws://localhost:8080/chat");

      /* save WebSocket to our state for components to access */
      dispatch({ type: "INITIALIZE_SOCKET", payload: ws } as ChatStateAction);

      ws.onopen = () => {
        /* create authentication message */
        const authMessage = JSON.stringify({
          type: "authenticate",
          username: chatState.credentials.username,
          password: chatState.credentials.password,
        });

        /* send authentication message */
        ws?.send(authMessage);
        dispatch({
          type: "UPDATE_IS_LOADING",
          payload: false,
        } as ChatStateAction);
      };

      ws.onmessage = (event: MessageEvent<string>) => {
        const message = JSON.parse(event.data);

        //handle errors
        if (message.type === "auth_response") {
          dispatch({
            type: "ADD_ERROR",
            payload: message.message,
          } as ChatStateAction);
          return;
        }

        //Update initial users
        if (message.type === "users" && Array.isArray(message.users)) {
          dispatch({
            type: "UPDATE_CONNECTIONS",
            payload: message.users,
          } as ChatStateAction);
          return;
        }

        //handle user join
        if (message.type === "user_joined") {
          dispatch({
            type: "ADD_TO_CHAT_LOG",
            payload: {
              chatterName: "",
              message: `${message.username} has joined the chat.`,
              timeStamp: new Date(),
            },
          } as ChatStateAction);
          if (message.username === chatState.credentials.username) return;
          dispatch({ type: "ADD_CONNECTION", payload: message.username });
          return;
        }

        //handle user leave
        if (message.type === "user_left") {
          dispatch({
            type: "ADD_TO_CHAT_LOG",
            payload: {
              chatterName: "",
              message: `${message.username} has left the chat.`,
              timeStamp: new Date(),
            },
          } as ChatStateAction);
          dispatch({ type: "REMOVE_CONNECTION", payload: message.username });
          return;
        }

        //handle chat message
        if (message.type === "message" && typeof message.message === "string") {
          dispatch({
            type: "ADD_TO_CHAT_LOG",
            payload: {
              chatterName: message.username,
              message: message.message,
              timeStamp: new Date(),
            },
          } as ChatStateAction);

          return;
        }
      };

      ws.onclose = (event) => {
        dispatch({
          type: "UPDATE_IS_LOADING",
          payload: true,
        });
        dispatch({
          type: "UPDATE_IS_CONNECTED",
          payload: false,
        });
        dispatch({ type: "RESET_SOCKET" });
        console.log(event);
      };

      /* Show error if we fail to load and allow users to attempt login again */
      ws.onerror = (error) => {
        console.log("WebSocket Error:", error);
        dispatch({
          type: "ADD_ERROR",
          payload: "Failed to connect to server",
        });
      };
    };

    connect();

    return () => {
      if (ws?.OPEN) {
        ws.close();
      }
    };
  }, [dispatch, serverURL]);

  return (
    <div className="flex flex-wrap gap-x-2 w-full">
      {chatState.isLoading ? (
        <div className="px-4 flex items-center gap-x-2  border w-full rounded-lg ">
          <Spinner />
          <p className="text-lg">Connecting to server...</p>
        </div>
      ) : (
        <div className="flex flex-col w-full">
          <p className="text-2xl bold">whos online</p>
          <div className="flex flex-wrap gap-x-2 gap-y-2 border rounded-lg p-4 text-lg">
            {chatState.chattersOnline.map((user, index) => {
              return (
                <p
                  key={"user-" + index}
                  className="bg-gray-200 border-gray-300 p-2 border rounded-md"
                >
                  {user}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ConnectionHandler;
