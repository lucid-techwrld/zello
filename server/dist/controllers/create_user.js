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
exports.addUserDetails = exports.createUser = void 0;
const database_1 = __importDefault(require("../database/database"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generakeOTP_1 = __importDefault(require("../helpers/generakeOTP"));
const sendOTP_1 = __importDefault(require("../helpers/sendOTP"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
    }
    try {
        const existingUser = yield (0, database_1.default)("users").where({ email }).first();
        if (existingUser) {
            res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = {
            email,
            password: hashedPassword,
        };
        const [user] = yield (0, database_1.default)("users")
            .insert(newUser)
            .returning(["id", "email", "avatar"]);
        const generatedOTP = (yield (0, generakeOTP_1.default)(user.email));
        yield (0, sendOTP_1.default)(user.email, generatedOTP);
        res.status(201).json({
            id: user.id,
            email: user.email,
            avatar: user.avatar,
            message: `OTP sent succesfully to ${user.email}. Check inbox`,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
exports.createUser = createUser;
const addUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, firstName, lastName, address, dob, userId } = req.body;
    if (!role || !firstName || !lastName || !address || !dob || !userId) {
        return res
            .status(400)
            .json({ success: false, message: "All fields are required" });
    }
    try {
        const userExists = yield (0, database_1.default)("users").where({ id: userId }).first();
        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: "User not found. Please register first.",
            });
        }
        const existingInfo = yield (0, database_1.default)("user_info")
            .where({ user_id: userId })
            .first();
        const existingAddress = yield (0, database_1.default)("user_address")
            .where({ user_id: userId })
            .first();
        if (existingInfo || existingAddress) {
            return res.status(409).json({
                success: false,
                message: "User details already exist. Update instead.",
            });
        }
        const parsedDob = new Date(dob);
        if (isNaN(parsedDob.getTime())) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid DOB format" });
        }
        const userInfo = {
            user_id: userId,
            first_name: firstName,
            last_name: lastName,
            dob: parsedDob,
            role,
        };
        const userAddress = {
            user_id: userId,
            street: address.street,
            city: address.city,
            state: address.state,
            country: address.country,
        };
        const [insertedInfo] = yield (0, database_1.default)("user_info")
            .insert(userInfo)
            .returning("*");
        const [insertedAddress] = yield (0, database_1.default)("user_address")
            .insert(userAddress)
            .returning("*");
        return res.status(201).json({
            success: true,
            message: "User details added successfully!",
            user: Object.assign(Object.assign({}, insertedInfo), { address: insertedAddress }),
        });
    }
    catch (error) {
        console.error("Error adding user details:", error);
        return res
            .status(500)
            .json({ success: false, error: "Internal Server Error" });
    }
});
exports.addUserDetails = addUserDetails;
