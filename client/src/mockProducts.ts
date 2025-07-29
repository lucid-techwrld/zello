import image1 from "./assets/images/IMG-20241123-WA0419-592x444.jpg";
import image2 from "./assets/images/06854e7d3c51c5-comfortable-modern-living-in-prime-area-detached-duplexes-for-sale-ajah-lagos.jpeg";
import image3 from "./assets/images/06838e88dc8d4c-luxury-5-bedroom-fully-detached-duplex-detached-duplexes-for-sale-lekki-lagos.jpeg";
import image4 from "./assets/images/0679a17c306c34-luxurious-4-bedroom-fully-detached-duplex-detached-duplexes-for-sale-lekki-lagos.jpg";
import image5 from "./assets/images/06838e88dc8d4c-luxury-5-bedroom-fully-detached-duplex-detached-duplexes-for-sale-lekki-lagos.jpeg";
import image6 from "./assets/images/06854e7d3c51c5-comfortable-modern-living-in-prime-area-detached-duplexes-for-sale-ajah-lagos.jpeg";
import type { PropertyType } from "./components/PropertyCard";

const mockProducts: PropertyType[] = [
  {
    id: "asgdgksadg",
    images: [image1, image2],
    type: "Duplex",
    title: "Modern Family Home",
    street: "Lekki, Lagos",
    city: "Lekki",
    state: "Lagos",
    price: 3200000,
    bedrooms: 4,
    bathrooms: 5,
    description:
      "A beautiful modern home perfect for families, located in the heart of Lekki.",
  },
  {
    id: "prop-002",
    images: [image2, image3],
    type: "Bungalow",
    title: "Cozy Starter Home",
    street: "Ajah Main Road",
    city: "Ajah",
    state: "Lagos",
    price: 1800000,
    bedrooms: 3,
    bathrooms: 2,
    description:
      "Affordable and cozy, ideal for first-time homeowners or rental investment.",
  },
  {
    id: "prop-003",
    images: [image4, image1],
    type: "Apartment",
    title: "Urban Apartment",
    street: "Banana Island Street",
    city: "Ikoyi",
    state: "Lagos",
    price: 4500000,
    bedrooms: 2,
    bathrooms: 2,
    description:
      "Luxury apartment with scenic views and modern amenities in a prime location.",
  },
  {
    id: "prop-004",
    images: [image5, image6],
    type: "Penthouse",
    title: "Luxury Penthouse",
    street: "Admiralty Way",
    city: "Lekki",
    state: "Lagos",
    price: 9500000,
    bedrooms: 5,
    bathrooms: 6,
    description:
      "Top-floor penthouse offering breathtaking views and premium interior finishing.",
  },
  {
    id: "prop-005",
    images: [image1, image5],
    type: "Detached",
    title: "Detached Duplex",
    street: "VGC Estate",
    city: "Ajah",
    state: "Lagos",
    price: 3700000,
    bedrooms: 4,
    bathrooms: 4,
    description: "Well-built detached duplex in a secure and serene estate.",
  },
  {
    id: "prop-006",
    images: [image3, image2],
    type: "Terrace",
    title: "Stylish Terrace Home",
    street: "Chevron Drive",
    city: "Lekki",
    state: "Lagos",
    price: 2800000,
    bedrooms: 3,
    bathrooms: 3,
    description:
      "Modern terrace building with spacious rooms and smart security systems.",
  },
  {
    id: "prop-007",
    images: [image6, image4],
    type: "Semi-Detached",
    title: "Semi-Detached Home",
    street: "Orchid Hotel Road",
    city: "Lekki",
    state: "Lagos",
    price: 3000000,
    bedrooms: 4,
    bathrooms: 4,
    description:
      "Contemporary living in this semi-detached unit close to amenities.",
  },
  {
    id: "prop-008",
    images: [image2, image3],
    type: "Mini Flat",
    title: "Compact Mini Flat",
    street: "Ikota Villa Estate",
    city: "Lekki",
    state: "Lagos",
    price: 1400000,
    bedrooms: 1,
    bathrooms: 1,
    description:
      "Simple and functional space, great for students or working professionals.",
  },
  {
    id: "prop-009",
    images: [image5, image1],
    type: "Mansion",
    title: "Executive Mansion",
    street: "Osapa London",
    city: "Lekki",
    state: "Lagos",
    price: 15000000,
    bedrooms: 6,
    bathrooms: 7,
    description:
      "Massive luxurious mansion for high-end lifestyle and entertaining guests.",
  },
  {
    id: "prop-010",
    images: [image4, image6],
    type: "Studio",
    title: "Studio Apartment",
    street: "Freedom Way",
    city: "Lekki Phase 1",
    state: "Lagos",
    price: 900000,
    bedrooms: 1,
    bathrooms: 1,
    description:
      "Compact and affordable studio, perfect for single professionals.",
  },
];

export default mockProducts;
