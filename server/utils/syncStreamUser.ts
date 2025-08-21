import { StreamChat } from "stream-chat";
import db from "../database/database";

const serverClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY!,
  process.env.STREAM_API_SECRET!,
  { timeout: 10000 }
);

async function syncUsers() {
  const users = await db("users")
    .join("user_info", "users.id", "user_info.user_id")
    .select(
      "users.id",
      "user_info.first_name",
      "user_info.last_name",
      "users.email"
    );

  const streamUsers = users.map((u) => ({
    id: u.id.toString(),
    name: [u.first_name, u.last_name].filter(Boolean).join(" ") || u.email,
  }));

  for (let i = 0; i < streamUsers.length; i += 100) {
    const batch = streamUsers.slice(i, i + 100);
    await serverClient.upsertUsers(batch);
    console.log(`Synced ${i + batch.length}/${streamUsers.length}`);
  }
}

syncUsers().catch(console.error);
