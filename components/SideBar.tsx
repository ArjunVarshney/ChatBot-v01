import { PlusIcon } from "@heroicons/react/24/outline";
import { ReactElement } from "react";

const SideBar: React.FC = (): ReactElement => {
  return (
    <div className="bg-[#202123] sm:min-w-[200px] overflow-y-auto">
      <NewChatButton />
    </div>
  );
};

const NewChatButton: React.FC = (): ReactElement => {
  return (
    <>
      <div className="flex space-x-1 justify-center cursor-pointer items-center transition-all p-4 border-b-2 border-[#fff] hover:bg-gray-400/10 text-white">
        <PlusIcon className="w-4 h-4" />
        <div>New Chat</div>
      </div>
    </>
  );
};

export default SideBar;
