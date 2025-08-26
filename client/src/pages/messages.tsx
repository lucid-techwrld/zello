import emptyChat from "../assets/icons/undraw_begin-chat_4wy6.png";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConversationList from "../components/ConversationList";
import { StreamChat } from "stream-chat";
import { useEffect, useState } from "react";
import useUserStore from "../hooks/useUserStore";
import useStream from "../hooks/useStream";
import LoadingScreen from "./LoadingScree";

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
    <div className="w-full h-full p-3">
      <div className="w-full bg-white border-b-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Chats</h1>
        <button
          onClick={() => navigate("/")}
          className="mr-6 rounded-full p-1 hover:bg-gray-200"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <input
        type="text"
        placeholder="Search messages..."
        className="w-full p-2 border rounded-md mt-3 mb-2 bg-white"
      />

      <ConversationList client={client} />

      {/* Empty state */}
      {false && (
        <div className="flex flex-col items-center justify-center mt-8">
          <img src={emptyChat} alt="emptyChat" className="w-48 h-48" />
          <p className="text-xl text-center font-semibold text-gray-500 mt-4">
            Start chatting to get your Dream House today!
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;
