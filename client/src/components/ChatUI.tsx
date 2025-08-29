import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import useStream from "../hooks/useStream";
import useUserStore from "../hooks/useUserStore";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import LoadingScreen from "../pages/LoadingScree";
import NavBar from "./NavBar";

const ChatUI = () => {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<StreamChat | null>(null);
  const user = useUserStore((state) => state.User);
  const initializeClient = useStream((state) => state.initializeClient);
  const initializeChat = useStream((state) => state.initializeChat);
  const channel = useStream((state) => state.channel);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !id) return;

    const streamClient = StreamChat.getInstance(
      import.meta.env.VITE_STREAM_API_KEY
    );

    const setupChat = async () => {
      await initializeClient(streamClient);

      await initializeChat(streamClient, user.id, id);

      setClient(streamClient);
    };

    setupChat();

    return () => {};
  }, [id, user, initializeClient, initializeChat]);

  if (!user) return <LoadingScreen />;
  if (!client) return <LoadingScreen />;

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-4">
      <aside className="hidden md:block md:col-span-1 lg:col-span-1 h-screen sticky top-0">
        <NavBar />
      </aside>
      <div className="w-full h-full col-span-1 md:col-span-3">
        <Chat client={client} theme="str-chat__theme-light">
          {channel ? (
            <Channel channel={channel}>
              <Window>
                <div className="flex flex-col h-screen">
                  <div className="flex-none border-b fixed z-50 w-full flex justify-between py-2 bg-white">
                    <ChannelHeader />
                    <button
                      onClick={() => navigate("/messages")}
                      className="mr-6 rounded-full p-1 hover:bg-gray-200"
                    >
                      <ArrowLeft size={20} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto mt-16">
                    <MessageList />
                  </div>

                  <div className="flex-none border-t">
                    <MessageInput />
                  </div>
                </div>
              </Window>
              <Thread />
            </Channel>
          ) : (
            <LoadingScreen />
          )}
        </Chat>
      </div>
    </div>
  );
};

export default ChatUI;
