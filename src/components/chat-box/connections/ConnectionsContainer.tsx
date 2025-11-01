import {
  useChatDispatch,
  useChatState,
  type ChatStateAction,
} from "../ChatContextProvider";
import ConnectionHandler from "./ConnectionHandler";
import SignIn from "./SignIn";

function ConnectionsContainer() {
  const { isConnected } = useChatState();
  const dispatch = useChatDispatch();

  const handleSignInAttempt = () => {
    dispatch({ type: "UPDATE_IS_CONNECTED", payload: true } as ChatStateAction);
    console.log("Attempting to sign in");
  };

  return (
    <section className="mt-4 flex w-full max-w-[800px]">
      {!isConnected ? (
        <SignIn handleSignIn={handleSignInAttempt} />
      ) : (
        <ConnectionHandler />
      )}
    </section>
  );
}

export default ConnectionsContainer;
