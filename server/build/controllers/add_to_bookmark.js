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
exports.deleteBookMark = exports.getBookMarks = exports.addBookMark = void 0;
const database_1 = __importDefault(require("../database/database"));
const addBookMark = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { images, title, description, price, bedrooms, bathrooms, state, street, city, type, id, } = req.body;
    if (!userId) {
        return res
            .status(400)
            .json({ success: false, message: "Please login and try again" });
    }
    if (!title ||
        !description ||
        !type ||
        !price ||
        !bedrooms ||
        !bathrooms ||
        !street ||
        !city ||
        !state ||
        !images ||
        !id) {
        return res
            .status(400)
            .json({ success: false, message: "All field are required" });
    }
    try {
        const user = yield (0, database_1.default)("users").where({ id: userId }).first();
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User does not exists" });
        }
        const existBookMark = yield (0, database_1.default)("bookmarks")
            .where({ user_id: userId })
            .andWhere({ property_id: id })
            .first();
        if (existBookMark) {
            return res.status(400).json({
                success: false,
                message: "Property already exists in BookMark",
            });
        }
        const bookmarkProperties = {
            property_id: id,
            title,
            description,
            type,
            price,
            bedrooms,
            bathrooms,
            images: JSON.stringify(images),
            street,
            city,
            state,
            user_id: userId,
        };
        const bookmark = yield (0, database_1.default)("bookmarks")
            .insert(bookmarkProperties)
            .returning("*");
        console.log("id", id, "savedid", bookmark);
        res.status(200).json({
            success: true,
            message: "Property Bookmarked successfully",
            bookmark,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong please try again later",
        });
    }
});
exports.addBookMark = addBookMark;
const getBookMarks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res
            .status(400)
            .json({ success: false, message: "Please login and try again" });
    }
    try {
        const user = yield (0, database_1.default)("users").where({ id: userId }).first();
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User does not exists" });
        }
        const bookmarks = yield (0, database_1.default)("bookmarks")
            .select("*")
            .where({ user_id: userId });
        res.status(200).json({
            success: true,
            message: "Bookmarks fecthed succesfully",
            bookmarks,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong please try again later",
        });
    }
});
exports.getBookMarks = getBookMarks;
const deleteBookMark = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const propertyId = req.query.id;
    if (!userId) {
        return res
            .status(400)
            .json({ success: false, message: "Please login and try again" });
    }
    if (!propertyId ||
        typeof propertyId !== "string" ||
        propertyId.trim() === "") {
        return res
            .status(400)
            .json({ success: false, message: "Invalid or missing property ID" });
    }
    try {
        const user = yield (0, database_1.default)("users").where({ id: userId }).first();
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User does not exists" });
        }
        //console.log(propertyId);
        //console.log("Deleting property:", propertyId, "for user:", userId);
        const deleted = yield (0, database_1.default)("bookmarks")
            .where({ property_id: propertyId, user_id: userId })
            .delete();
        if (deleted === 0) {
            return res.status(404).json({
                success: false,
                message: "Bookmark not found or already deleted",
            });
        }
        return res
            .status(200)
            .json({ success: true, message: "property deledted succesfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong please try again later",
        });
    }
});
exports.deleteBookMark = deleteBookMark;
