"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { db } from "../firebase";
import useSWR from "swr";

type Props = {
  id: string;
};

const ChatInput = ({ id }: Props) => {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  const sendMessage = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const input = prompt.trim();

    if (!input) return;
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(db, "users", session?.user?.email!, "chats", id, "messages"),
      message
    );

    const notification = toast.loading("Let me think...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatid: id,
        model,
        session,
      }),
    }).then(() => {
      // Toast for successfull
      toast.success("Done!", {
        id: notification,
      });
    });
  };

  return (
    <div className="my-4">
      <form
        onSubmit={sendMessage}
        className="flex mx-auto w-[95%] justify-center bg-gray-700/50 pr-4 text-[#b4b4b4] rounded"
      >
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-[100%] mx-3 p-4 bg-transparent focus:outline-none"
          placeholder="Type your message here...."
        />
        <button
          type="submit"
          disabled={!prompt}
          className="disabled:opacity-50"
        >
          <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
