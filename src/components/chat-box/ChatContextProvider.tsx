import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";

export const ChatStateContext = createContext<ChatState | undefined>(undefined);

export const ChatDispatchContext = createContext<
  Dispatch<ChatStateAction> | undefined
>(undefined);

export interface ChatState {
  isConnected: boolean;
  chatLog: Array<ChatMessage>; //todo: create and change to Chat interface
  chattersOnline: Array<string>; //todo: create and change to Chatters interface
  credentials: Credentials;
  isLoading: boolean;
  webSocket: WebSocket | null;
  error: string | null;
}

export interface ChatMessage {
  chatterName: string;
  message: string;
  timeStamp: Date;
}

export interface Credentials {
  username: string;
  password: string;
}

export type ChatStateAction =
  | { type: "UPDATE_IS_CONNECTED"; payload: boolean }
  | { type: "ADD_TO_CHAT_LOG"; payload: ChatMessage }
  | { type: "UPDATE_CONNECTIONS"; payload: string[] }
  | { type: "ADD_CONNECTION"; payload: string }
  | { type: "REMOVE_CONNECTION"; payload: string }
  | { type: "UPDATE_CREDENTIALS"; payload: Credentials }
  | { type: "UPDATE_IS_LOADING"; payload: boolean }
  | { type: "INITIALIZE_SOCKET"; payload: WebSocket }
  | { type: "RESET_SOCKET" }
  | { type: "ADD_ERROR"; payload: string }
  | { type: "RESET_ERROR" };

function ChatStateReducer(state: ChatState, action: ChatStateAction) {
  switch (action.type) {
    case "UPDATE_IS_CONNECTED": {
      return { ...state, isConnected: action.payload };
    }

    case "ADD_TO_CHAT_LOG": {
      const newChatLog = [...state.chatLog];
      newChatLog.push(action.payload);
      return { ...state, chatLog: newChatLog };
    }

    case "UPDATE_CONNECTIONS": {
      const newConnections = [...action.payload];
      return { ...state, chattersOnline: newConnections };
    }

    case "ADD_CONNECTION": {
      const newConnections = [...state.chattersOnline];
      newConnections.push(action.payload);
      return { ...state, chattersOnline: newConnections };
    }

    case "REMOVE_CONNECTION": {
      const newConnections = state.chattersOnline.filter((name) => {
        action.payload !== name;
      });
      return { ...state, chattersOnline: newConnections };
    }

    case "UPDATE_CREDENTIALS": {
      return { ...state, credentials: action.payload };
    }

    case "UPDATE_IS_LOADING": {
      return { ...state, isLoading: action.payload };
    }

    case "INITIALIZE_SOCKET": {
      return { ...state, webSocket: action.payload };
    }

    case "RESET_SOCKET": {
      return { ...state, webSocket: null };
    }

    case "ADD_ERROR": {
      return { ...state, error: action.payload };
    }

    case "RESET_ERROR": {
      return { ...state, error: null };
    }

    default: {
      console.log("Uknown action type:", action);
      return state;
    }
  }
}

function ChatContextProvider({ children }: { children: ReactNode }) {
  const initialChatState = {
    isConnected: false,
    chatLog: [],
    chattersOnline: [],
    credentials: { username: "", password: "" },
    isLoading: true, //loads until logged in
    webSocket: null,
    error: null,
  };
  const [state, dispatch] = useReducer(ChatStateReducer, initialChatState);
  return (
    <ChatStateContext.Provider value={state}>
      <ChatDispatchContext.Provider value={dispatch}>
        {children}
      </ChatDispatchContext.Provider>
    </ChatStateContext.Provider>
  );
}

export function useChatState() {
  const chatState = useContext(ChatStateContext);

  if (!chatState) {
    throw new Error(
      "Please make sure your component is wrapped in the ChatContext Provider"
    );
  }

  return chatState;
}

export function useChatDispatch() {
  const chatDispatch = useContext(ChatDispatchContext);

  if (!chatDispatch) {
    throw new Error(
      "Please make sure your component is wrapped in the ChatContext Provider"
    );
  }

  return chatDispatch;
}

export default ChatContextProvider;
