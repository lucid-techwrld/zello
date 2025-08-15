"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database/database"));
const redis_1 = __importDefault(require("../utils/redis"));
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res
            .status(400)
            .json({ success: false, message: "Please login and try again" });
    }
    const cacheKey = `profile:${userId}`;
    try {
        const cachedProfile = yield redis_1.default.get(cacheKey);
        if (cachedProfile) {
            console.log("Profile Cached Hit Sucessfylly");
            return res.json({ success: true, profile: JSON.parse(cachedProfile) });
        }
    }
    catch (error) {
        console.error("Redis Profile cache error:", error);
    }
    try {
        const profile = yield (0, database_1.default)("users")
            .join("user_info", "users.id", "user_info.user_id")
            .join("user_address", "users.id", "user_address.user_id")
            .select("users.id", "users.email", "users.avatar", "user_info.first_name", "user_info.last_name", "user_info.role", "user_info.dob", "user_address.street", "user_address.city", "user_address.state", "user_address.country")
            .where("users.id", userId)
            .first();
        if (!profile) {
            return res
                .status(404)
                .json({ success: false, message: "Profile not found" });
        }
        try {
            yield redis_1.default.set(cacheKey, JSON.stringify(profile), "EX", 60 * 5);
            console.log("Profile Cached Sucessfylly");
        }
        catch (cacheError) {
            console.log("❌ Redis error (set):", cacheError);
        }
        return res.status(200).json({ success: true, profile });
    }
    catch (error) {
        console.error("Profile error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.default = getProfile;
