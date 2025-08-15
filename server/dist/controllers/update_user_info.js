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
const updateUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const { firstName, lastName, street, city, state, dob } = req.body;
    if (!firstName || !lastName || !street || !city || !state || !dob) {
        return res
            .status(400)
            .json({ success: false, message: "No fields to update" });
    }
    try {
        const user = yield (0, database_1.default)("users").where({ id: userId }).first();
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }
        const parsedDob = new Date(dob);
        if (isNaN(parsedDob.getTime())) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid DOB format" });
        }
        const updatedUser = yield (0, database_1.default)("user_info")
            .where({ user_id: userId })
            .update({
            first_name: firstName,
            last_name: lastName,
            dob: parsedDob,
        })
            .returning("*");
        const updatedAddress = yield (0, database_1.default)("user_address")
            .where({ user_id: userId })
            .update({
            street: street,
            city: city,
            state: state,
        })
            .returning("*");
        try {
            yield redis_1.default.del(`profile:${userId}`);
        }
        catch (error) {
            console.error("Error deleting user from Redis cache:", error);
        }
        return res.status(200).json({
            success: true,
            message: "User information updated successfully",
        });
    }
    catch (error) {
        console.error("Error updating user info:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
});
exports.default = updateUserInfo;
