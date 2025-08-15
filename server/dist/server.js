"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const auth_route_1 = __importDefault(require("./routes/auth_route"));
const verification_routes_1 = __importDefault(require("./routes/verification_routes"));
const property_route_1 = __importDefault(require("./routes/property_route"));
const user_route_1 = __importDefault(require("./routes/user_route"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
const whiteList = ["http://localhost:5173", "http://localhost:5000"];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || whiteList.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "../client/dist")));
app.use("/auth", auth_route_1.default);
app.use("/verify", verification_routes_1.default);
app.use("/property", property_route_1.default);
app.use("/user", user_route_1.default);
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../client/dist", "index.html"));
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server is running on PORT", port);
});
