"use client";

import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { ReactElement, useEffect, useRef } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";

type Props = {
  id: string;
};

const Chat = ({ id }: Props): ReactElement => {
  const { data: session } = useSession();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const [messages] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats", id, "messages"),
        orderBy("createdAt", "asc")
      )
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {messages?.empty && (
        <>
          <p className="mt-10 text-white text-center">
            Type a prompt to get started!
          </p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
        </>
      )}

      {messages?.docs.map((message) => {
        return <Message message={message.data()} key={message.id} />;
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Chat;
