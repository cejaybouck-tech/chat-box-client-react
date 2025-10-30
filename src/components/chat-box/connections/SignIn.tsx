import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import type { MouseEventHandler } from "react";
import { useChatState } from "../ChatContextProvider";

function SignIn({
  handleSignIn,
}: {
  handleSignIn: MouseEventHandler<HTMLButtonElement>;
}) {
  const { error } = useChatState();

  return (
    <div className="flex flex-col">
      <Dialog>
        <DialogTrigger className="border px-4 py-2 bg-blue-700 rounded-2xl text-white">
          Sign In
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lets Start Chatting!</DialogTitle>
            <DialogDescription>
              Sign in to experience communication via text!
            </DialogDescription>
          </DialogHeader>
          <button
            className={"px-2 border hover:bg-neutral-200"}
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
