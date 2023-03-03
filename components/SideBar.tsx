"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCollection } from "react-firebase-hooks/firestore";
import { ReactElement } from "react";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";

const SideBar = (): ReactElement => {
  const { data: session } = useSession();

  const [chats, value, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="bg-[#202123] sm:min-w-[200px] sm:block h-screen">
      <div className="overflow-y-auto sm:p-3 h-[90%]">
        <NewChatButton />

        <div className="hidden sm:inline">
          <ModelSelection/>
        </div>

        <div>
          {chats?.docs.map((chat) => {
            return <ChatRow key={chat.id} id={chat.id} />;
          })}
        </div>
      </div>
      {session && (
        <div>
          <img
            onClick={() => signOut()}
            className="mx-auto p-1 sm:p-0 w-10 h-10 rounded-full hover:opacity-50 my-3"
            src={session.user?.image!}
            alt="Profile Pic"
          />
        </div>
      )}
    </div>
  );
};

const NewChatButton = (): ReactElement => {
  const router = useRouter();
  const { data: session } = useSession();
  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );
    router.push(`/chat/${doc.id}`);
  };
  return (
    <>
      <div
        onClick={() => createNewChat()}
        className="flex rounded space-x-1 justify-center cursor-pointer items-center transition-all py-2 sm:px-4 hover:bg-gray-400/10 text-white"
      >
        <PlusIcon className="w-6 h-6 sm:w-4 sm:h-4" />
        <div className="hidden sm:block">New Chat</div>
      </div>
    </>
  );
};

export default SideBar;
