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
exports.addProperty = void 0;
const database_1 = __importDefault(require("../database/database"));
const upload_image_1 = require("./upload_image");
const redis_1 = __importDefault(require("../utils/redis"));
let imageURLS;
const addProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { title, description, type, price, bedrooms, bathrooms, street, city, state, } = req.body;
    const images = req.files;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
    if (!userId) {
        return res
            .status(401)
            .json({ success: false, message: "Please login and try again" });
    }
    if (role !== "lease") {
        return res.status(401).json({
            success: false,
            message: "User with the role of rent cannot access this route",
        });
    }
    if (!title ||
        !description ||
        !type ||
        !price ||
        !bedrooms ||
        !bathrooms ||
        !street ||
        !city ||
        !state) {
        return res
            .status(400)
            .json({ success: false, message: "All field are required" });
    }
    try {
        const user = yield (0, database_1.default)("users").where({ id: userId }).first();
        if (!user) {
            return res.json({
                success: false,
                message: "Please create and account and try again later",
            });
        }
        imageURLS = yield (0, upload_image_1.uploadImage)(images);
        const property = {
            user_id: userId,
            title,
            description,
            type,
            price,
            bedrooms,
            bathrooms,
            street,
            city,
            state,
            images: JSON.stringify(imageURLS === null || imageURLS === void 0 ? void 0 : imageURLS.urls),
        };
        const [addedProperty] = yield (0, database_1.default)("properties")
            .insert(property)
            .returning("*");
        const keys = yield redis_1.default.keys("properties:*");
        if (keys.length > 0)
            yield redis_1.default.del(keys);
        if (!addedProperty) {
            yield (0, upload_image_1.deleteUploadedImage)(imageURLS.publicIds);
            return res.status(500).json({
                success: false,
                message: "Failed to save property. Images have been deleted.",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Property uploaded successfully",
            addedProperty,
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Something went wrong please try again later",
        });
    }
});
exports.addProperty = addProperty;
