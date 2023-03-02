"use client";

import { ReactElement } from "react";
import { SessionProvider as Provider } from "next-auth/react";
import { Session } from "next-auth";

type Props = {
  children: React.ReactNode;
  session: Session | null;
};

const SessionProvider = ({ children, session }: Props): ReactElement => {
  return <Provider>{children}</Provider>;
};

export default SessionProvider;
