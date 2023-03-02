import { ReactElement } from "react";
import Chat from "../../../components/Chat";
import ChatInput from "../../../components/ChatInput";

type Props = {
  params: {
    id: string;
  };
};

const ChatPage = ({ params: { id } }: Props): ReactElement => {
  return (
    <div className="flex flex-col h-screen">
      <Chat id={id} />
      <ChatInput id={id} />
    </div>
  );
};

export default ChatPage;
