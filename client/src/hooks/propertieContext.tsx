import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import extractAxiosErrorMessage from "../components/extractError";
import { useUser } from "./userContext";

interface CreateContextTypes {
  getProperties: () => Promise<void>;
  properties: propertyType[] | null;
  nearby: propertyType[] | null;
  loading: boolean;
  property: propertyType | null;
  getProperty: (propertyId: string) => Promise<void>;
  getNearbyProperties: (userLocation: string) => Promise<void>;
}

interface ContextProviderProps {
  children: React.ReactNode;
}

interface propertyType {
  id: string;
  title: string;
  description: string;
  type: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  street: string;
  city: string;
  state: string;
  images: string[];
}
const PropertyContext = createContext<CreateContextTypes | null>(null);

export const PropertyProvider = ({ children }: ContextProviderProps) => {
  const [properties, setProperties] = useState<propertyType[] | null>(null);
  const [property, setProperty] = useState<propertyType | null>(null);
  const [nearby, setNearby] = useState<propertyType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();

  const getProperties = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/property/lists", {
        withCredentials: true,
      });

      if (res.status !== 200) {
        throw new Error("Fail to get Properties");
      }
      setProperties(res.data?.properties);
      console.log(res.data?.properties);
    } catch (error) {
      const message = extractAxiosErrorMessage(error);
      console.log(message);
    } finally {
      setLoading(false);
    }
  };

  const getProperty = async (propertyId: string): Promise<void> => {
    if (!propertyId) {
      throw new Error("Property id is not provided");
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/property/list?propertyId=${propertyId}`,
        {
          withCredentials: true,
        }
      );

      if (res.status !== 200) {
        throw new Error("Failed to get property");
      }
      setProperty(res.data?.property);
      console.log(res.data?.property);
    } catch (error) {
      const message = extractAxiosErrorMessage(error);
      console.log(message);
    }
  };

  const getNearbyProperties = async (userLocation: string): Promise<void> => {
    if (!userLocation) {
      throw new Error("Property id is not provided");
    }
    try {
      const res = await axios.get(
        `http://localhost:5000/property/search?q=${userLocation}`,
        {
          withCredentials: true,
        }
      );

      if (res.status !== 200) {
        throw new Error("Fail to get nearby property");
      }

      setNearby(res.data?.results);
      console.log("Nearby properies", res.data?.results);
    } catch (error) {
      const message = extractAxiosErrorMessage(error);
      console.log(message);
    }
  };

  useEffect(() => {
    getProperties();
    if (user) {
      const stateOnly = user?.state.replace(/ State$/i, "").trim();
      getNearbyProperties(stateOnly);
    }
  }, [user]);
  return (
    <PropertyContext.Provider
      value={{
        properties,
        getProperties,
        loading,
        property,
        getProperty,
        getNearbyProperties,
        nearby,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("Propert context is undefined");
  }
  return context;
};
