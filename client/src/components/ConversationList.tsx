import { useEffect, useState } from "react";
import type { Channel as StreamChannel } from "stream-chat";
import { StreamChat } from "stream-chat";
import { useNavigate } from "react-router-dom";

interface Props {
  client: StreamChat;
}

export default function ConversationList({ client }: Props) {
  const [channels, setChannels] = useState<StreamChannel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChannels = async () => {
      const filter = { type: "messaging", members: { $in: [client.userID!] } };
      const sort = { last_message_at: -1 as const };
      const chan = await client.queryChannels(filter, sort, {
        watch: true,
        state: true,
      });

      setChannels(chan);
    };

    fetchChannels();
  }, [client]);

  return (
    <div className="flex flex-col divide-y divide-gray-200">
      {channels.map((channel) => {
        const otherMember = Object.values(channel.state.members).find(
          (m) => m.user?.id !== client.userID
        )?.user;
        const lastMessage =
          channel.state.messages[channel.state.messages.length - 1];

        return (
          <button
            key={channel.id}
            onClick={() => navigate(`/chat/${channel.id}`)}
            className="flex items-center p-3 hover:bg-gray-100 text-left"
          >
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
              {otherMember?.name?.[0] ?? "U"}
            </div>

            {/* Name + last message */}
            <div className="ml-3 flex-1">
              <div className="font-medium">
                {otherMember?.name ?? "Unknown"}
              </div>
              <div className="text-sm text-gray-500 truncate">
                {lastMessage?.text ?? "No messages yet"}
              </div>
            </div>

            <div className="ml-2 text-xs text-gray-400">
              {lastMessage?.created_at
                ? new Date(lastMessage.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""}
            </div>
          </button>
        );
      })}
    </div>
  );
}
