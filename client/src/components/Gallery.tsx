import image1 from "../assets/images/IMG-20241123-WA0419-592x444.jpg";
import image2 from "../assets/images/06854e7d3c51c5-comfortable-modern-living-in-prime-area-detached-duplexes-for-sale-ajah-lagos.jpeg";
import image3 from "../assets/images/06838e88dc8d4c-luxury-5-bedroom-fully-detached-duplex-detached-duplexes-for-sale-lekki-lagos.jpeg";
import image4 from "../assets/images/0679a17c306c34-luxurious-4-bedroom-fully-detached-duplex-detached-duplexes-for-sale-lekki-lagos.jpg";
import image5 from "../assets/images/06838e88dc8d4c-luxury-5-bedroom-fully-detached-duplex-detached-duplexes-for-sale-lekki-lagos.jpeg";
import image6 from "../assets/images/06854e7d3c51c5-comfortable-modern-living-in-prime-area-detached-duplexes-for-sale-ajah-lagos.jpeg";

const Gallery = () => {
  const images: string[] = [image1, image2, image3, image4, image5, image6];
  return (
    <div className="w-full h-full p-3">
      <h1 className="text-xl font-bold ">Gallery</h1>
      <div className="mt-2 flex gap-2 overflow-x-auto  w-full h-30">
        {images.map((img, index) => (
          <div key={index} className="min-w-20 h-24 rounded-md overflow-hidden">
            <img
              src={img}
              alt="image"
              className="w-full h-full object-cover"
              onClick={() => window.open(img, "_blank")}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
