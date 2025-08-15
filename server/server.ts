import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import authRoute from "./routes/auth_route";
import verifyRoute from "./routes/verification_routes";
import propertyRoute from "./routes/property_route";
import userRouter from "./routes/user_route";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());

const whiteList = [
  "http://localhost:5173",
  "http://localhost:5000",
  "https://zello-home.onrender.com",
];
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use("/auth", authRoute);
app.use("/verify", verifyRoute);
app.use("/property", propertyRoute);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on PORT", port);
});
