import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { ReactElement } from "react";

function HomePage(): ReactElement {
  return (
    <div className=" h-screen text-white flex flex-col justify-center items-center px-2">
      <h1 className="text-5xl font-bold mb-20">ChatBot-v01</h1>

      <div className="flex space-x-2 text-center">
        {CardComponent(
          "Examples",
          <SunIcon className="h-8 w-8" />,
          "Explain something to me",
          "What is the difference between a cat and a dog ?",
          "What is the color of the sun"
        )}
        {CardComponent(
          "Capabilities",
          <BoltIcon className="h-8 w-8" />,
          "Change the ChatGPT Models to use",
          "Messages are stored in Firebase's Firestore",
          "Hot Toast Notification when ChatBot is thinking !"
        )}
        {CardComponent(
          "Capabilities",
          <ExclamationTriangleIcon className="h-8 w-8" />,
          "May occasionally generate incorrect information",
          "May occasionally generate harmful instructions and biased content",
          "Limited to knowledge till 2021"
        )}
      </div>
    </div>
  );
}

function CardComponent(
  heading: string,
  icon: ReactElement,
  ...msgs: string[]
): ReactElement {
  return (
    <div>
      <div className="flex flex-col justify-center items-center mb-5">
        {icon}
        <h2 className="font-semibold">{heading}</h2>
      </div>
      <div className="space-y-2">
        {msgs.map((msg: string, index: number) => {
          return (
            <p className="infoText" key={index}>
              "{msg}"
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
