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
    <div className="bg-[#202123] sm:min-w-[200px] h-screen">
      <div className="overflow-y-auto h-[90%]">
        <NewChatButton />
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
            className="mx-auto w-10 h-10 rounded-full hover:opacity-50 my-3"
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
        className="flex space-x-1 justify-center cursor-pointer items-center transition-all py-2 px-4 border-b-[1px] border-[#5c5c5c] hover:bg-gray-400/10 text-white"
      >
        <PlusIcon className="w-4 h-4" />
        <div>New Chat</div>
      </div>
    </>
  );
};

export default SideBar;
