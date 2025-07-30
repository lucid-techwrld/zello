// @ts-nocheck

/**
 * @param {import('knex').Knex} knex
 */

import { faker } from "@faker-js/faker";

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

exports.seed = async function (knex) {
  const leaseUsers = await knex("user_info")
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
    const randomUser =
      leaseUsers[Math.floor(Math.random() * leaseUsers.length)];

    const randomImages = Array.from(
      { length: faker.number.int({ min: 2, max: 4 }) },
      () => sampleImages[Math.floor(Math.random() * sampleImages.length)]
    );

    return {
      id: faker.string.uuid(),
      user_id: randomUser.user_id,
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      type: types[Math.floor(Math.random() * types.length)],
      price: faker.number.int({ min: 10000, max: 500000 }),
      bedrooms: faker.number.int({ min: 1, max: 5 }),
      bathrooms: faker.number.int({ min: 1, max: 5 }),
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      images: JSON.stringify(randomImages),
      is_available: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
  });

  await knex("properties").del();
  await knex("properties").insert(properties);
};
