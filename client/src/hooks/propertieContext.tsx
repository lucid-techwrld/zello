import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import extractAxiosErrorMessage from "../components/extractError";
import mockProducts from "../mockProducts";
import { useUser } from "./userContext";
import type { PropertyType } from "../components/PropertyCard";

interface CreateContextTypes {
  getProperties: (page?: number) => Promise<void>;
  totalPages: number;
  properties: PropertyType[] | null;
  nearby: PropertyType[] | null;
  searchResult: PropertyType[] | null;
  bookmarkedProperties: PropertyType[] | null;
  loading: boolean;
  property: PropertyType | null;
  getProperty: (propertyId: string) => Promise<void>;
  getBookMarkeds: () => Promise<void>;
  getNearbyProperties: (userLocation: string) => Promise<void>;
  searchProperties: (search: string) => Promise<boolean>;
  bookmarkProperty: (property: PropertyType) => Promise<boolean>;
  deleteBookMark: (propertyId: string | undefined) => Promise<void>;
}

interface ContextProviderProps {
  children: React.ReactNode;
}

const PropertyContext = createContext<CreateContextTypes | null>(null);

const usedIndices = new Set<number>();
const defaultNearby: PropertyType[] = [];

while (defaultNearby.length < 3) {
  const randomIndex = Math.floor(Math.random() * mockProducts.length);

  if (!usedIndices.has(randomIndex)) {
    usedIndices.add(randomIndex);
    defaultNearby.push(mockProducts[randomIndex]);
  }
}

export const PropertyProvider = ({ children }: ContextProviderProps) => {
  const [properties, setProperties] = useState<PropertyType[] | null>(null);
  const [property, setProperty] = useState<PropertyType | null>(null);
  const [nearby, setNearby] = useState<PropertyType[]>(defaultNearby);
  const [searchResult, setSearchResult] = useState<PropertyType[] | null>(null);
  const [bookmarkedProperties, setBookMarkedPropperties] = useState<
    PropertyType[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { user } = useUser();

  const getProperties = useCallback(async (page: number = 1): Promise<void> => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/property/lists?page=${page}&limit=14`,
        {
          withCredentials: true,
        }
      );

      if (res.status !== 200) {
        throw new Error("Failed to get properties");
      }

      setProperties(res.data?.properties);
      setTotalPages(res.data?.pagination.totalPages);
      console.log("Properties", res.data);
    } catch (error) {
      const message = extractAxiosErrorMessage(error);
      console.log(message);
    } finally {
      setLoading(false);
    }
  }, []);

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

      setNearby((prevProp) => {
        const newItems = res.data?.results.filter(
          (item: PropertyType) => !prevProp.some((p) => p.id === item.id)
        );
        return [...newItems, ...prevProp];
      });
      console.log("Nearby properies", res.data?.results);
    } catch (error) {
      const message = extractAxiosErrorMessage(error);
      console.log(message);
    }
  };

  const searchProperties = async (search: string): Promise<boolean> => {
    try {
      const res = await axios.get(
        `http://localhost:5000/property/search?q=${search}`,
        {
          withCredentials: true,
        }
      );

      if (res.status !== 200) {
        throw new Error("Fail to get nearby property");
      }

      setSearchResult(res.data?.results);

      console.log("search result", res.data?.results);
      return true;
    } catch (error) {
      const message = extractAxiosErrorMessage(error);
      console.log(message);
      return false;
    }
  };

  const bookmarkProperty = async (property: PropertyType): Promise<boolean> => {
    try {
      const res = await axios.post(
        "http://localhost:5000/property/bookmark",
        property,
        {
          withCredentials: true,
        }
      );

      if (res.status !== 200) {
        throw new Error("Fail to get nearby property");
      }

      console.log(res.data?.bookmark);
      return true;
    } catch (error) {
      const message = extractAxiosErrorMessage(error);
      console.log(message);
      return false;
    }
  };

  const getBookMarkeds = async (): Promise<void> => {
    try {
      const res = await axios.get(
        "http://localhost:5000/property/bookmarkeds",
        {
          withCredentials: true,
        }
      );

      if (res.status !== 200) {
        throw new Error("Fail to get nearby property");
      }

      console.log("Bookmakrs", res.data?.bookmarks);
      setBookMarkedPropperties(res.data?.bookmarks);
    } catch (error) {
      const message = extractAxiosErrorMessage(error);
      console.log(message);
    }
  };

  const deleteBookMark = async (propertyId: string | undefined) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/property/bookmark/delete?id=${propertyId}`,
        {
          withCredentials: true,
        }
      );

      if (res.status !== 200) {
        throw new Error("Fail to get nearby property");
      }

      setBookMarkedPropperties((prevProperties) => {
        if (!prevProperties) return [];
        const updated = prevProperties.filter(
          (prop) => prop.property_id !== propertyId
        );
        return updated.length > 0 ? updated : null;
      });

      console.log("Bookmakrs Deleted", res.data);
    } catch (error) {
      const message = extractAxiosErrorMessage(error);
      console.log(message);
    }
  };

  useEffect(() => {
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
        searchProperties,
        searchResult,
        nearby,
        bookmarkProperty,
        bookmarkedProperties,
        getBookMarkeds,
        deleteBookMark,
        totalPages,
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
