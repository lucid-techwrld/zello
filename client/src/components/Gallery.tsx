type GalleryProps = {
  images: string[];
};
const Gallery = ({ images }: GalleryProps) => {
  return (
    <div className="w-full h-auto p-3">
      <h1 className="text-xl font-bold ">Gallery</h1>
      {images.length > 0 ? (
        <div className="mt-2 flex gap-2 overflow-x-auto  w-full h-30">
          {images.map((img, index) => (
            <div
              key={index}
              className="min-w-20 h-24 rounded-md overflow-hidden"
            >
              <img
                src={img}
                alt="image"
                className="w-full h-full object-cover"
                onClick={() => window.open(img, "_blank")}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No pictures provided</p>
      )}
    </div>
  );
};

export default Gallery;
