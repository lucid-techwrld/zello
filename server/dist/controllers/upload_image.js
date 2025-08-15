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
exports.deleteUploadedImage = exports.uploadImage = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const uploadImage = (files) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uploads = {
            urls: [],
            publicIds: [],
        };
        for (const file of files) {
            const result = yield cloudinary_1.default.uploader.upload(file.path, {
                folder: "property-images",
            });
            uploads.urls.push(result.secure_url);
            uploads.publicIds.push(result.public_id);
        }
        return uploads;
    }
    catch (error) {
        console.log(error);
    }
});
exports.uploadImage = uploadImage;
const deleteUploadedImage = (publicIds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!publicIds || !publicIds.length)
            return;
        const deletePromises = publicIds.map((publicId) => cloudinary_1.default.uploader.destroy(publicId));
        const results = yield Promise.all(deletePromises);
        results.forEach((result, i) => {
            if (result.result === "ok") {
                console.log(`✅ Deleted ${publicIds[i]}`);
            }
            else {
                console.warn(` Failed to delete ${publicIds[i]}`, result);
            }
        });
    }
    catch (error) {
        console.error("Error deleting images:", publicIds, error);
    }
});
exports.deleteUploadedImage = deleteUploadedImage;
