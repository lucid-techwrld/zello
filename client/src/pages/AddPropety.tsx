import React, { useState } from "react";
import extractAxiosErrorMessage from "../components/extractError";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import usePropertyStore from "../hooks/usePropertyStore";
import { generateDescription } from "../utils/openRouter";

export default function ListProperty() {
  const [images, setImages] = useState<File[] | null>([]);
  const addProperty = usePropertyStore((state) => state.addProperty);
  const loading = usePropertyStore((state) => state.loading.addProperty);
  const [generatedDesc, setGeneratedDesc] = useState<string>("");
  const [propertyData, setPropertyData] = useState({
    title: "",
    bathrooms: "",
    bedrooms: "",
    price: "",
    type: "",
  });
  const navigate = useNavigate();

  const handleGenerateDesc = async () => {
    //console.log("running....");
    const { title, type, bathrooms, bedrooms, price } = propertyData;
    if (!(title || type || bathrooms || bedrooms || price)) return;
    const result = await generateDescription(
      title,
      bathrooms,
      bedrooms,
      price,
      type
    );
    console.log(result);
    if (result) setGeneratedDesc(result);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    if (images) {
      images.forEach((img) => {
        formData.append("images", img);
      });
    }

    try {
      const success = await addProperty(formData);
      if (success) {
        navigate("/properties");
      }
      form.reset();
    } catch (error) {
      const message = extractAxiosErrorMessage(error);
      console.log(message);
    } finally {
      setImages(null);
    }
  };

  if (!images) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10"
    >
      <h2 className="text-2xl font-bold mb-6">📋 List Your Property</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm md:text-lg  font-medium mb-1">
            Property Title
          </label>
          <input
            name="title"
            value={propertyData.title}
            onChange={(e) =>
              setPropertyData((prev) => ({ ...prev, title: e.target.value }))
            }
            type="text"
            placeholder="e.g. Cozy Apartment in Lekki"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm md:text-lg font-medium mb-1">
            Property Type
          </label>
          <select
            name="type"
            value={propertyData.type}
            onChange={(e) =>
              setPropertyData((prev) => ({ ...prev, type: e.target.value }))
            }
            className="w-full px-4 py-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Type</option>
            <option value="self-contain">Self-Contain / Mini Flat</option>
            <option value="single-room">Single Room</option>
            <option value="1-bedroom-flat">1 Bedroom Flat</option>
            <option value="2-bedroom-flat">2 Bedroom Flat</option>
            <option value="3-bedroom-flat">3 Bedroom Flat</option>
            <option value="bungalow">Bungalow</option>
            <option value="duplex">Duplex</option>
            <option value="terrace">Terrace House</option>
            <option value="detached-house">Detached House</option>
            <option value="shared-apartment">Shared Apartment</option>
            <option value="penthouse">Penthouse</option>
            <option value="mansion">Mansion</option>
            <option value="short-let">Short Let</option>
            <option value="serviced-apartment">Serviced Apartment</option>
            <option value="furnished-apartment">Furnished Apartment</option>
            <option value="face-me-i-face-you">Face-me-I-face-you</option>
            <option value="office-space">Office Space</option>
            <option value="shop">Shop / Store</option>
            <option value="warehouse">Warehouse</option>
            <option value="event-center">Event Center / Hall</option>
          </select>
        </div>

        <div>
          <label className="block text-sm md:text-lg  font-medium mb-1">
            Price (₦)
          </label>
          <input
            name="price"
            type="number"
            value={propertyData.price}
            onChange={(e) =>
              setPropertyData((prev) => ({ ...prev, price: e.target.value }))
            }
            placeholder="e.g. 150000"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm md:text-lg  font-medium mb-1">
            Number of Bedrooms
          </label>
          <input
            name="bedrooms"
            value={propertyData.bedrooms}
            onChange={(e) =>
              setPropertyData((prev) => ({ ...prev, bedrooms: e.target.value }))
            }
            type="number"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm md:text-lg  font-medium mb-1">
            Number of Bathrooms
          </label>
          <input
            name="bathrooms"
            value={propertyData.bathrooms}
            onChange={(e) =>
              setPropertyData((prev) => ({
                ...prev,
                bathrooms: e.target.value,
              }))
            }
            type="number"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
      </div>

      {/* Description */}
      <div className="mt-6 relative">
        <label className="block text-sm md:text-lg  font-medium mb-1">
          Property Description
        </label>
        <textarea
          name="description"
          id="description"
          defaultValue={generatedDesc}
          rows={4}
          placeholder="Describe your property..."
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white max-h-52 min-h-44"
        />
        <button
          type="button"
          title="Generate a description with AI"
          className="generateai"
          onClick={handleGenerateDesc}
        >
          <span>✨ Generate</span>
        </button>
      </div>

      {/* Location */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm md:text-lg  font-medium mb-1">
            Street Address
          </label>
          <input
            name="street"
            type="text"
            className="w-full px-4 py-2 border rounded-xl bg-white"
          />
        </div>
        <div>
          <label className="block text-sm md:text-lg  font-medium mb-1">
            City
          </label>
          <input
            name="city"
            type="text"
            className="w-full px-4 py-2 border rounded-xl bg-white"
          />
        </div>
        <div>
          <label className="block text-sm md:text-lg  font-medium mb-1 bg-white">
            State
          </label>
          <input
            name="state"
            type="text"
            className="w-full px-4 py-2 border rounded-xl bg-white"
          />
        </div>
        <div>
          <label className="block text-sm md:text-lg  font-medium mb-1 bg-white">
            Country
          </label>
          <input
            name="country"
            type="text"
            defaultValue={"Nigeria"}
            className="w-full px-4 py-2 border rounded-xl bg-white"
          />
        </div>
      </div>

      {/* Image Upload */}
      <div className="mt-6">
        <label className="block text-sm md:text-lg  font-medium mb-1">
          Upload Images
        </label>
        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-2"
        />
        <div className="grid grid-cols-3 gap-3 mt-4">
          {images.length > 0 &&
            images.map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                alt="Preview"
                className="w-28 h-28 object-cover rounded-lg border"
              />
            ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="flex gap-2 justify-center items-center mt-8 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
      >
        Submit Property{" "}
        {loading && <Loader className="w-6 h-6 text-white animate-spin" />}
      </button>
    </form>
  );
}
