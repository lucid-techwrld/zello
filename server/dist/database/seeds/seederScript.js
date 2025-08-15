"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param {import('knex').Knex} knex
 */
const faker_1 = require("@faker-js/faker");
const types = [
    "self-contain",
    "single-room",
    "1-bedroom-flat",
    "2-bedroom-flat",
    "3-bedroom-flat",
    "bungalow",
    "duplex",
    "terrace",
    "detached-house",
    "shared-apartment",
    "penthouse",
    "mansion",
    "short-let",
    "serviced-apartment",
    "furnished-apartment",
    "face-me-i-face-you",
    "office-space",
    "shop",
    "warehouse",
    "event-center",
];
exports.seed = function (knex) {
    return __awaiter(this, void 0, void 0, function* () {
        const leaseUsers = yield knex("user_info")
            .join("users", "user_info.user_id", "users.id")
            .where("user_info.role", "lease")
            .select("users.id as user_id");
        const sampleImages = [
            "https://res.cloudinary.com/lucidtechwrld/image/upload/v1753957822/Two-story4bedroomhouse-ID2441101_j9kdws.webp",
            "https://res.cloudinary.com/lucidtechwrld/image/upload/v1753957811/Simple-House-Design-25x39-Feet-House-Design-7.5x12-M-4-Beds-3-Bath-front-Cover_geouwz.jpg",
            "https://res.cloudinary.com/lucidtechwrld/image/upload/v1753957811/image_ogejsf.jpg",
            "https://res.cloudinary.com/lucidtechwrld/image/upload/v1753957810/House-in-nSW-step-by-step-process-1024x693_qz5rt3.jpg",
            "https://res.cloudinary.com/lucidtechwrld/image/upload/v1753957809/House-Design-2-Storey-8.50m-x-10m-85-sqm-4-Bedrooms-front_ydhnib.jpg",
            "https://res.cloudinary.com/lucidtechwrld/image/upload/v1753957809/which-mansion-tops-the-list-of-the-worlds-most-expensive-houses_tczsig.webp",
            "https://res.cloudinary.com/lucidtechwrld/image/upload/v1753957809/how-to-design-a-house_zydktd.jpg",
            "https://res.cloudinary.com/lucidtechwrld/image/upload/v1753957794/maxresdefault_bmzyam.jpg",
            "https://res.cloudinary.com/lucidtechwrld/image/upload/v1753957793/Crop600x400_z71nb2.jpg",
            "https://res.cloudinary.com/lucidtechwrld/image/upload/v1753957793/195893238_acbjqn.jpg",
            "https://res.cloudinary.com/lucidtechwrld/image/upload/v1753466638/property-images/gtcdijpgkeekgykrw7va.jpg",
        ];
        const properties = Array.from({ length: 50 }, () => {
            const randomUser = leaseUsers[Math.floor(Math.random() * leaseUsers.length)];
            const randomImages = Array.from({ length: faker_1.faker.number.int({ min: 2, max: 4 }) }, () => sampleImages[Math.floor(Math.random() * sampleImages.length)]);
            return {
                id: faker_1.faker.string.uuid(),
                user_id: randomUser.user_id,
                title: faker_1.faker.lorem.sentence(),
                description: faker_1.faker.lorem.paragraph(),
                type: types[Math.floor(Math.random() * types.length)],
                price: faker_1.faker.number.int({ min: 10000, max: 500000 }),
                bedrooms: faker_1.faker.number.int({ min: 1, max: 5 }),
                bathrooms: faker_1.faker.number.int({ min: 1, max: 5 }),
                street: faker_1.faker.location.streetAddress(),
                city: faker_1.faker.location.city(),
                state: faker_1.faker.location.state(),
                images: JSON.stringify(randomImages),
                is_available: true,
                created_at: new Date(),
                updated_at: new Date(),
            };
        });
        yield knex("properties").del();
        yield knex("properties").insert(properties);
    });
};
