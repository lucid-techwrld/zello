import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on PORT", port);
});
