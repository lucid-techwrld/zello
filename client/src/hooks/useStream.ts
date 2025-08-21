import type { Channel, StreamChat } from "stream-chat";
import { create } from "zustand";
import API from "../utils/axiosInstance";
import extractAxiosErrorMessage from "../components/extractError";
import useUserStore from "./useUserStore";

interface StreamStore {
  initializeClient: (client: StreamChat) => Promise<void>;
  initializeChat: (client: StreamChat, channelId: string) => Promise<void>;
  channel: Channel | null;
  setChannel: (channel: Channel | null) => void;
}

const useStream = create<StreamStore>((set, get) => ({
  channel: null,
  setChannel: (channel: Channel | null) => set({ channel }),

  // Connect user only once
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
            id: user.id.toString(),
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

  // Join existing channel or watch it
  initializeChat: async (client: StreamChat, channelId: string) => {
    try {
      const channel = client.channel("messaging", channelId);
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
