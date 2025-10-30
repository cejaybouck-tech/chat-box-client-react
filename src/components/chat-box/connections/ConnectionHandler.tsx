import { useEffect } from "react";
import {
  useChatDispatch,
  useChatState,
  type ChatStateAction,
} from "../ChatContextProvider";

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

      /* update chat box or who is online on message from server */
      ws.onmessage = (event: MessageEvent<string>) => {
        //todo: add update logins if response is approved authentication.
        //todo: add message to chatbox if response is a message.
        console.log("Received Message:");
        console.log(event.data);
      };

      /* attempt recconect if connection fails */
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

      /* Show error is we fail to load and allow users to attempt login again */
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
        <p className="px-4 animate-pulse border w-full rounded-lg text-lg">
          Connecting to server...
        </p>
      ) : (
        <p>loaded</p>
      )}
    </div>
  );
}

export default ConnectionHandler;
