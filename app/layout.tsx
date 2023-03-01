import SideBar from "../components/SideBar";
import "../styles/globals.css";

export const metadata = {
  title: "ChatBot-v01",
  description: "All purpose chat bot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <SideBar />
          {/* Client side notification system */}
          <div className="bg-[#343541] flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
