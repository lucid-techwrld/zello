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
const generakeOTP_1 = __importDefault(require("../helpers/generakeOTP"));
const sendOTP_1 = __importDefault(require("../helpers/sendOTP"));
const requestOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required",
        });
    }
    try {
        const user = yield (0, database_1.default)("users").where({ email }).first();
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const generatedOTP = (yield (0, generakeOTP_1.default)(email));
        yield (0, sendOTP_1.default)(email, generatedOTP);
        return res
            .status(200)
            .json({ success: true, message: "OTP verification sent succesfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong please try again later",
        });
    }
});
exports.default = requestOTP;
