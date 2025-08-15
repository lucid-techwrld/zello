"use strict";
//@ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = require("../config/multer");
const auth_1 = __importDefault(require("../middlewares/auth"));
const add_property_1 = require("../controllers/add_property");
const get_properties_1 = require("../controllers/get_properties");
const add_to_bookmark_1 = require("../controllers/add_to_bookmark");
const router = express_1.default.Router();
router.post("/upload", auth_1.default, multer_1.upload.array("images"), add_property_1.addProperty);
router.get("/list", get_properties_1.getProperty);
router.get("/search", get_properties_1.searchProperties);
router.get("/lists", get_properties_1.getProperties);
router.post("/bookmark", auth_1.default, add_to_bookmark_1.addBookMark);
router.get("/bookmarkeds", auth_1.default, add_to_bookmark_1.getBookMarks);
router.delete("/bookmark/delete", auth_1.default, add_to_bookmark_1.deleteBookMark);
router.get("/user/lease", auth_1.default, get_properties_1.getUserProperties);
exports.default = router;
