import { getServerSession } from "next-auth/next";
import ClientSideProvider from "../components/ClientSideProvider";
import Login from "../components/Login";
import SessionProvider from "../components/SessionProvider";
import SideBar from "../components/SideBar";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import "../styles/globals.css";

export const metadata = {
  title: "ChatBot-v01",
  description: "All purpose chat bot",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <SideBar />

              <ClientSideProvider/>

              <div className="bg-[#343541] flex-1">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
