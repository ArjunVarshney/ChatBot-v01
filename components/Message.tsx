import { DocumentData } from "firebase/firestore";
import { ReactElement } from "react";

type Props = {
  message: DocumentData;
};

const Message = ({ message }: Props): ReactElement => {
  const isChatBot = message.user.name == "ChatBot-v01";
  return (
    <div className={`${isChatBot ? "bg-gray-500/20" : ""}`}>
      <div className={`flex px-4 sm:px-6 md:px-8 space-x-4 py-8 text-white items-center`}>
        <img
          src={message.user.avatar}
          alt=""
          className="h-8 w-8 rounded"
        />
        <p className="">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
