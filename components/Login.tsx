"use client";

import { ReactElement } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

const Login = (): ReactElement => {
  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center">
      <Image
        src="https://links.papareact.com/2i6"
        width={300}
        height={300}
        alt="ChatBot-Logo"
      />
      <button
        onClick={() => signIn("google")}
        className="text-[#11A37F] text-3xl animate-pulse bg-white rounded-[5px] font-semibold pt-2 px-4 pb-3 text-center"
      >
        Sign In
      </button>
    </div>
  );
};

export default Login;
