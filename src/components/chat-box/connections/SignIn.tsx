import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState, type ChangeEvent, type MouseEventHandler } from "react";
import {
  useChatDispatch,
  useChatState,
  type ChatStateAction,
} from "../ChatContextProvider";

function SignIn({
  handleSignIn,
}: {
  handleSignIn: MouseEventHandler<HTMLButtonElement>;
}) {
  const { error, credentials } = useChatState();
  const dispatch = useChatDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex flex-col w-full">
      <Dialog>
        <DialogTrigger className="border px-4 py-2 bg-blue-700 rounded-2xl text-white">
          Sign In
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lets Start Chatting!</DialogTitle>
            <DialogDescription>
              An account will be created for you automatically, if you don't
              already have one.
            </DialogDescription>
          </DialogHeader>
          <label htmlFor="username" className="pl-1 hidden">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="border p-2 rounded-md"
            placeholder="Username"
            onChange={(e: ChangeEvent) => {
              const { value } = e.currentTarget as HTMLInputElement;
              dispatch({
                type: "UPDATE_CREDENTIALS",
                payload: { username: value, password: credentials.password },
              } as ChatStateAction);
            }}
            value={credentials.username}
          />
          <div className="flex w-full gap-x-1">
            <label htmlFor="password" className="pl-1 hidden">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="border p-2 rounded-md w-full"
              placeholder="Password"
              onChange={(e: ChangeEvent) => {
                const { value } = e.currentTarget as HTMLInputElement;
                dispatch({
                  type: "UPDATE_CREDENTIALS",
                  payload: { username: credentials.username, password: value },
                } as ChatStateAction);
              }}
              value={credentials.password}
            />
            <button
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              className={"p-2 border hover:bg-neutral-200 rounded-md"}
            >
              {showPassword ? "show" : "hide"}
            </button>
          </div>
          <button
            className={"p-2 border hover:bg-neutral-200 rounded-md"}
            onClick={handleSignIn}
          >
            Sign in
          </button>
        </DialogContent>
      </Dialog>
      {error && (
        <p className="text-red-700 text-lg text-center mt-2">{error}</p>
      )}
    </div>
  );
}

export default SignIn;
