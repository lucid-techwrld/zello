import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import authRoute from "./routes/auth_route";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on PORT", port);
});
