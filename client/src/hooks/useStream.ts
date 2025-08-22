import type { Channel, StreamChat } from "stream-chat";
import { create } from "zustand";
import API from "../utils/axiosInstance";
import extractAxiosErrorMessage from "../components/extractError";
import useUserStore from "./useUserStore";

interface StreamStore {
  initializeClient: (client: StreamChat) => Promise<void>;
  initializeChat: (
    client: StreamChat,
    userId: string,
    otherUserId: string
  ) => Promise<void>;
  channel: Channel | null;
  setChannel: (channel: Channel | null) => void;
}

const useStream = create<StreamStore>((set, get) => ({
  channel: null,
  setChannel: (channel: Channel | null) => set({ channel }),

  initializeClient: async (client: StreamChat) => {
    const user = useUserStore.getState().User;
    if (!user) {
      console.error("User is not logged in");
      return;
    }

    try {
      const res = await API.get("/stream/generate-token");
      const { token } = res.data;
      if (!token) throw new Error("Token missing");

      if (!client.userID) {
        await client.connectUser(
          {
            id: user.id.toLowerCase(), // ✅ always lowercase
            name: `${user.first_name} ${user.last_name}`,
          },
          token
        );
      }
    } catch (error) {
      console.error(
        "Error initializing Stream client:",
        extractAxiosErrorMessage(error)
      );
    }
  },

  initializeChat: async (
    client: StreamChat,
    userId: string,
    otherUserId: string
  ) => {
    try {
      const channel = client.channel("messaging", {
        members: [userId.toLowerCase(), otherUserId.toLowerCase()], // ✅ both lowercase
      });

      await channel.watch();
      get().setChannel(channel);
    } catch (error) {
      console.error(
        "Error initializing chat:",
        extractAxiosErrorMessage(error)
      );
    }
  },
}));

export default useStream;
