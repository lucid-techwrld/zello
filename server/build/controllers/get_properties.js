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
exports.getUserProperties = exports.searchProperties = exports.getProperty = exports.getProperties = void 0;
const database_1 = __importDefault(require("../database/database"));
const redis_1 = __importDefault(require("../utils/redis"));
const getProperties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Math.max(1, parseInt(req.query.page || "1", 10));
    const limit = Math.max(1, parseInt(req.query.limit || "10", 10));
    const offset = (page - 1) * limit;
    const cacheKey = `properties:page=${page}:limit=${limit}`;
    try {
        const cachedData = yield redis_1.default.get(cacheKey);
        if (cachedData) {
            try {
                return res.json(JSON.parse(cachedData));
            }
            catch (parseErr) {
                console.error("Error parsing cached properties data:", parseErr);
            }
        }
        const properties = yield (0, database_1.default)("properties")
            .select("*")
            .offset(offset)
            .limit(limit);
        const total = yield (0, database_1.default)("properties").count("id as count").first();
        const response = {
            success: true,
            properties,
            pagination: {
                page,
                limit,
                total: Number(total === null || total === void 0 ? void 0 : total.count),
                totalPages: Math.ceil(Number(total === null || total === void 0 ? void 0 : total.count) / limit),
            },
        };
        try {
            yield redis_1.default.set(cacheKey, JSON.stringify(response), "EX", 60 * 5);
        }
        catch (cacheError) {
            console.log("❌ Redis error (set):", cacheError);
        }
        res.json(response);
    }
    catch (error) {
        console.error("getProperties error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong, please try again later",
        });
    }
});
exports.getProperties = getProperties;
const getProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const propId = (_a = req.query) === null || _a === void 0 ? void 0 : _a.propertyId;
    if (!propId) {
        return res
            .status(400)
            .json({ success: false, message: "Property id not provided" });
    }
    const cacheKey = `property:${propId}`;
    try {
        const cachedResponse = yield redis_1.default.get(cacheKey);
        if (cachedResponse) {
            try {
                return res.json({ success: true, results: JSON.parse(cachedResponse) });
            }
            catch (error) {
                yield redis_1.default.del(cacheKey);
                console.error("Error parsing cached property data:", error);
            }
        }
        const property = yield (0, database_1.default)("properties").where({ id: propId }).first();
        if (!property) {
            return res
                .status(404)
                .json({ success: false, message: "Property not found" });
        }
        try {
            yield redis_1.default.set(cacheKey, JSON.stringify(property), "EX", 60 * 5);
        }
        catch (cacheError) {
            console.log("❌ Redis error (set):", cacheError);
        }
        res.status(200).json({ success: true, property });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong please try again later",
        });
    }
});
exports.getProperty = getProperty;
const searchProperties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query.q;
    if (!search) {
        return res
            .status(400)
            .json({ success: false, message: "Search query is required" });
    }
    try {
        const cacheKey = `search:${search}`;
        const cachedResults = yield redis_1.default.get(cacheKey);
        if (cachedResults) {
            try {
                return res.json({ success: true, results: JSON.parse(cachedResults) });
            }
            catch (error) {
                console.error("Error parsing cached search results:", error);
            }
        }
        const results = yield (0, database_1.default)("properties")
            .select("*")
            .whereRaw(`search_vector @@ plainto_tsquery('english', ?)`, [search])
            .orderByRaw(`ts_rank(search_vector, plainto_tsquery('english', ?)) DESC`, [search]);
        try {
            yield redis_1.default.set(cacheKey, JSON.stringify(results), "EX", 60 * 5);
        }
        catch (cacheError) {
            console.log("❌Redis error (set):", cacheError);
        }
        return res.status(200).json({ success: true, results });
    }
    catch (error) {
        console.error("Search failed:", error);
        return res.status(500).json({ success: false, message: "Search failed" });
    }
});
exports.searchProperties = searchProperties;
const getUserProperties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
    const limit = Math.max(1, parseInt(req.query.limit || "10", 10)); // default to 10
    const cursor = (_c = req.query.cursor) === null || _c === void 0 ? void 0 : _c.trim();
    if (!userId || !role) {
        return res
            .status(400)
            .json({ success: false, message: "Please login and try again" });
    }
    const isValidUUID = (str) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
    const cacheKey = `leaseUserP:cursor=${cursor || "start"}:limit=${limit}`;
    const cachedResults = yield redis_1.default.get(cacheKey);
    if (cachedResults) {
        try {
            return res.status(200).json(JSON.parse(cachedResults));
        }
        catch (error) {
            console.log("Error parsing cached lease user properties", error);
        }
    }
    try {
        const user = yield (0, database_1.default)("users").where({ id: userId }).first();
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found, Please create an account and try again",
            });
        }
        if (role !== "lease") {
            return res.status(401).json({
                success: false,
                message: "User with the role of rent cannot access this route",
            });
        }
        let query = (0, database_1.default)("properties")
            .select("*")
            .where({ user_id: userId })
            .orderBy("id", "asc")
            .limit(limit + 1);
        if (cursor && isValidUUID(cursor)) {
            query = query.andWhere("id", ">", cursor);
        }
        const properties = yield query;
        let nextCursor = null;
        if (properties.length > limit) {
            const nextItem = properties.pop();
            nextCursor = (nextItem === null || nextItem === void 0 ? void 0 : nextItem.id) || null;
        }
        const response = {
            success: true,
            properties,
            nextCursor,
        };
        try {
            yield redis_1.default.set(cacheKey, JSON.stringify(response), "EX", 60 * 5);
        }
        catch (error) {
            console.error("Error caching lease user properties", error);
        }
        res.status(200).json(response);
    }
    catch (error) {
        console.error("Error fetching user properties", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong please try again later",
        });
    }
});
exports.getUserProperties = getUserProperties;
