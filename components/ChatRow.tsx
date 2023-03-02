import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

type Props = {
  id: string;
};

const ChatRow = ({ id }: Props): ReactElement => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [messages] = useCollection(
    query(
      collection(db, "users", session?.user?.email!, "chats", id, "messages"),
      orderBy("createdAt", "asc")
    )
  );

  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(id));
  }, [pathname]);

  return (
    <Link
      href={`/chat/${id}`}
      className={`flex px-4 py-2 justify-center max-w-[200px] text-white items-center hover:bg-gray-500/10 ${
        active ? "bg-gray-500/10" : ""
      }`}
    >
      <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />
      <p className="flex-1 hidden sm:inline-flex truncate mr-5">
        {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
      </p>
      <TrashIcon
        onClick={() => removeChat()}
        className="h-5 w-5 text-red-600 hover:text-gray-400 transition-all"
      />
    </Link>
  );
};

export default ChatRow;
