import image1 from "./assets/images/IMG-20241123-WA0419-592x444.jpg";
import image2 from "./assets/images/06854e7d3c51c5-comfortable-modern-living-in-prime-area-detached-duplexes-for-sale-ajah-lagos.jpeg";
import image3 from "./assets/images/06838e88dc8d4c-luxury-5-bedroom-fully-detached-duplex-detached-duplexes-for-sale-lekki-lagos.jpeg";
import image4 from "./assets/images/0679a17c306c34-luxurious-4-bedroom-fully-detached-duplex-detached-duplexes-for-sale-lekki-lagos.jpg";
import image5 from "./assets/images/06838e88dc8d4c-luxury-5-bedroom-fully-detached-duplex-detached-duplexes-for-sale-lekki-lagos.jpeg";
import image6 from "./assets/images/06854e7d3c51c5-comfortable-modern-living-in-prime-area-detached-duplexes-for-sale-ajah-lagos.jpeg";

interface ViewProductProps {
  id: number;
  image: string;
  name: string;
  location: string;
  price: number;
  bedroooms: number;
  toilets: number;
  size: string;
  desc: string;
}

export const mockProducts: ViewProductProps[] = [
  {
    id: 1,
    image: image1,
    name: "Modern Family Home",
    location: "Lekki, Lagos",
    price: 3200000,
    bedroooms: 4,
    toilets: 5,
    size: "450 sqm",
    desc: "A beautiful modern home perfect for families, located in the heart of Lekki.",
  },
  {
    id: 2,
    image: image2,
    name: "Luxury Detached Duplex",
    location: "Ajah, Lagos",
    price: 4200000,
    bedroooms: 5,
    toilets: 6,
    size: "600 sqm",
    desc: "Spacious luxury duplex with modern amenities and ample parking space.",
  },
  {
    id: 3,
    image: image3,
    name: "Executive Residence",
    location: "Ikoyi, Lagos",
    price: 5500000,
    bedroooms: 6,
    toilets: 7,
    size: "700 sqm",
    desc: "An executive residence with premium finishing and a serene environment.",
  },
  {
    id: 4,
    image: image4,
    name: "Urban Apartment",
    location: "Surulere, Lagos",
    price: 1800000,
    bedroooms: 3,
    toilets: 4,
    size: "300 sqm",
    desc: "A cozy urban apartment close to major attractions and business districts.",
  },
  {
    id: 5,
    image: image5,
    name: "Prime Area Duplex",
    location: "Lekki Phase 1, Lagos",
    price: 3900000,
    bedroooms: 5,
    toilets: 6,
    size: "500 sqm",
    desc: "A prime duplex in a secure estate with modern facilities.",
  },
  {
    id: 6,
    image: image6,
    name: "Comfort Villa",
    location: "Victoria Island, Lagos",
    price: 4700000,
    bedroooms: 4,
    toilets: 5,
    size: "480 sqm",
    desc: "A comfortable villa with a beautiful garden and swimming pool.",
  },
  {
    id: 7,
    image: image1,
    name: "Classic Mansion",
    location: "Banana Island, Lagos",
    price: 12000000,
    bedroooms: 7,
    toilets: 9,
    size: "1200 sqm",
    desc: "A classic mansion with luxury features and breathtaking views.",
  },
  {
    id: 8,
    image: image2,
    name: "Cozy Bungalow",
    location: "Yaba, Lagos",
    price: 1500000,
    bedroooms: 2,
    toilets: 2,
    size: "200 sqm",
    desc: "A cozy and affordable bungalow ideal for small families or singles.",
  },
  {
    id: 9,
    image: image3,
    name: "Elegant Terrace",
    location: "Magodo, Lagos",
    price: 2800000,
    bedroooms: 3,
    toilets: 3,
    size: "350 sqm",
    desc: "An elegant terrace house in a gated community with 24/7 security.",
  },
  {
    id: 10,
    image: image4,
    name: "Spacious Penthouse",
    location: "Ikeja GRA, Lagos",
    price: 6000000,
    bedroooms: 5,
    toilets: 6,
    size: "800 sqm",
    desc: "A spacious penthouse with panoramic city views and luxury amenities.",
  },
];

export default mockProducts;
