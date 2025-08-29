import emptyChat from "../assets/icons/undraw_begin-chat_4wy6.png";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConversationList from "../components/ConversationList";
import { StreamChat } from "stream-chat";
import { useEffect, useState } from "react";
import useUserStore from "../hooks/useUserStore";
import useStream from "../hooks/useStream";
import LoadingScreen from "./LoadingScree";
import { SearchIcon as Search } from "lucide-react";
import NavBar from "../components/NavBar";

const Messages = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState<StreamChat | null>(null);
  const user = useUserStore((state) => state.User);
  const initializeClient = useStream((state) => state.initializeClient);

  useEffect(() => {
    if (!user) return;

    const streamClient = StreamChat.getInstance(
      import.meta.env.VITE_STREAM_API_KEY
    );

    initializeClient(streamClient).then(() => {
      setClient(streamClient);
    });

    return () => {
      if (streamClient.userID) {
        streamClient
          .disconnectUser()
          .catch((err) =>
            console.warn("Error disconnecting Stream user:", err)
          );
      }
    };
  }, [user, initializeClient]);

  if (!client) return <LoadingScreen />;

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-4 bg-gray-50">
      <aside className="hidden md:block md:col-span-1 lg:col-span-1 h-screen sticky top-0">
        <NavBar />
      </aside>
      <div className="w-full h-full col-span-1 md:col-span-3 flex flex-col">
        <div className="sticky top-0 z-10 bg-white border-b flex items-center justify-between px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/")}
              className="rounded-full p-2 hover:bg-gray-100 transition"
            >
              <ArrowLeft size={22} />
            </button>
            <h1 className="text-xl font-bold">Chats</h1>
          </div>
        </div>

        <div className="px-4 py-3 bg-white shadow-sm">
          <div className="relative">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-3 py-2">
          <ConversationList client={client} />
        </div>

        {false && (
          <div className="flex flex-col items-center justify-center flex-1 px-6 text-center">
            <img src={emptyChat} alt="emptyChat" className="w-40 h-40 mb-4" />
            <p className="text-lg font-medium text-gray-600">
              Start chatting to get your Dream House today!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
