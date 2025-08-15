import { create } from "zustand";
import axios from "axios";
import extractAxiosErrorMessage from "../components/extractError";
import mockProducts from "../mockProducts";
import type { PropertyType } from "../components/PropertyCard";

interface LoadingState {
  properties: boolean;
  profile: boolean;
  nearby: boolean;
  search: boolean;
  bookmarks: boolean;
  addProperty: boolean;
}

interface PropertyStore {
  properties: PropertyType[] | null;
  property: PropertyType | null;
  nearby: PropertyType[];
  searchResult: PropertyType[] | null;
  bookmarkedProperties: PropertyType[] | null;
  totalPages: number;
  leaseUserProperties: PropertyType[];
  loadingLeaseProps: boolean;
  hasMore: boolean;
  isFetchingLeaseRef: React.MutableRefObject<boolean>;
  loading: LoadingState;
  setLoading: (Key: keyof LoadingState, value: boolean) => void;
  getProperties: (page?: number) => Promise<void>;
  getProperty: (propertyId: string) => Promise<void>;
  getNearbyProperties: (userLocation: string) => Promise<void>;
  searchProperties: (search: string) => Promise<boolean>;
  bookmarkProperty: (property: PropertyType) => Promise<boolean>;
  getBookMarkeds: () => Promise<void>;
  deleteBookMark: (propertyId: string | undefined) => Promise<void>;
  getLeaseUserProperties: () => Promise<void>;
  addProperty: (formData: FormData) => Promise<boolean>;
}

const usedIndices = new Set<number>();
const defaultNearby: PropertyType[] = [];
while (defaultNearby.length < 3) {
  const randomIndex = Math.floor(Math.random() * mockProducts.length);
  if (!usedIndices.has(randomIndex)) {
    usedIndices.add(randomIndex);
    defaultNearby.push(mockProducts[randomIndex]);
  }
}

const usePropertyStore = create<PropertyStore>((set, get) => {
  const isFetchingLeaseRef = { current: false };

  return {
    properties: null,
    property: null,
    nearby: defaultNearby,
    searchResult: null,
    bookmarkedProperties: null,
    totalPages: 1,
    leaseUserProperties: [],
    loadingLeaseProps: false,
    hasMore: true,
    isFetchingLeaseRef,
    loading: {
      properties: false,
      profile: false,
      nearby: false,
      search: false,
      bookmarks: false,
      addProperty: false,
    },

    setLoading: (Key: string, value: boolean) => {
      set((state) => ({
        loading: { ...state.loading, [Key]: value },
      }));
    },

    addProperty: async (formData: FormData) => {
      const setLoading = get().setLoading;
      setLoading("addProperty", true);
      try {
        const res = await axios.post("/property/upload", formData, {
          withCredentials: true,
        });

        if (res.status !== 200) {
          throw new Error("Fail to upload property");
        }
        return true;
      } catch (error) {
        console.log(extractAxiosErrorMessage(error));
        return false;
      } finally {
        setLoading("addProperty", false);
      }
    },

    getProperties: async (page = 1) => {
      const { setLoading } = get();
      setLoading("properties", true);
      try {
        const res = await axios.get(`/property/lists?page=${page}&limit=14`, {
          withCredentials: true,
        });
        if (res.status !== 200) throw new Error("Failed to get properties");
        set({
          properties: res.data?.properties,
          totalPages: res.data?.pagination.totalPages,
        });
      } catch (error) {
        console.log(extractAxiosErrorMessage(error));
      } finally {
        setLoading("properties", false);
      }
    },

    getProperty: async (propertyId: string) => {
      if (!propertyId) throw new Error("Property id is not provided");
      try {
        const res = await axios.get(`/property/list?propertyId=${propertyId}`, {
          withCredentials: true,
        });
        if (res.status !== 200) throw new Error("Failed to get property");
        set({ property: res.data?.property });
      } catch (error) {
        console.log(extractAxiosErrorMessage(error));
      }
    },

    getNearbyProperties: async (userLocation: string) => {
      if (!userLocation) throw new Error("Property id is not provided");
      set((state) => ({
        loading: { ...state.loading, nearby: true },
      }));

      const stateOnly = userLocation.replace(/ State$/i, "").trim();
      try {
        const res = await axios.get(`/property/search?q=${stateOnly}`, {
          withCredentials: true,
        });
        if (res.status !== 200) throw new Error("Fail to get nearby property");
        set((state) => ({
          nearby: [
            ...res.data?.results.filter(
              (item: PropertyType) =>
                !state.nearby.some((p) => p.id === item.id)
            ),
            ...state.nearby,
          ],
        }));
        console.log("nearby properties", res.data?.results);
      } catch (error) {
        console.log(extractAxiosErrorMessage(error));
      } finally {
        set((state) => ({
          loading: { ...state.loading, nearby: false },
        }));
      }
    },

    searchProperties: async (search: string) => {
      const { setLoading } = get();
      setLoading("search", true);
      set({ searchResult: null });
      try {
        const res = await axios.get(`/property/search?q=${search}`, {
          withCredentials: true,
        });
        if (res.status !== 200) throw new Error("Fail to get nearby property");
        set({ searchResult: res.data?.results });
        return true;
      } catch (error) {
        console.log(extractAxiosErrorMessage(error));
        return false;
      } finally {
        setLoading("search", false);
      }
    },

    bookmarkProperty: async (property: PropertyType) => {
      try {
        const res = await axios.post("/property/bookmark", property, {
          withCredentials: true,
        });
        if (res.status !== 200) throw new Error("Fail to get nearby property");
        return true;
      } catch (error) {
        console.log(extractAxiosErrorMessage(error));
        return false;
      }
    },

    getBookMarkeds: async () => {
      const { setLoading } = get();
      setLoading("bookmarks", true);
      try {
        const res = await axios.get("/property/bookmarkeds", {
          withCredentials: true,
        });
        if (res.status !== 200) throw new Error("Fail to get nearby property");
        set({ bookmarkedProperties: res.data?.bookmarks });
      } catch (error) {
        console.log(extractAxiosErrorMessage(error));
      } finally {
        set((state) => ({
          loading: { ...state.loading, bookmarks: false },
        }));
      }
    },

    deleteBookMark: async (propertyId: string | undefined) => {
      try {
        const res = await axios.delete(
          `/property/bookmark/delete?id=${propertyId}`,
          { withCredentials: true }
        );
        if (res.status !== 200) throw new Error("Fail to get nearby property");
        set((state) => ({
          bookmarkedProperties: state.bookmarkedProperties
            ? state.bookmarkedProperties.filter(
                (prop) => prop.property_id !== propertyId
              )
            : null,
        }));
      } catch (error) {
        console.log(extractAxiosErrorMessage(error));
      }
    },

    getLeaseUserProperties: async () => {
      const state = get();
      if (
        state.loadingLeaseProps ||
        !state.hasMore ||
        state.isFetchingLeaseRef.current
      )
        return;
      try {
        state.isFetchingLeaseRef.current = true;
        set({ loadingLeaseProps: true });
        const res = await axios.get(
          `/property/user/lease?cursor=${
            state.leaseUserProperties.length
              ? state.leaseUserProperties[state.leaseUserProperties.length - 1]
                  .id
              : ""
          }&limit=10`,
          { withCredentials: true }
        );
        if (res.status !== 200) throw new Error("Fail to get lease properties");
        const { properties, nextCursor } = res.data;
        set((prev) => ({
          leaseUserProperties: [
            ...prev.leaseUserProperties,
            ...(properties || []).filter(
              (p: PropertyType) =>
                !prev.leaseUserProperties.some((lp) => lp.id === p.id)
            ),
          ],
          hasMore: !!nextCursor,
        }));
      } catch (error) {
        console.log(extractAxiosErrorMessage(error));
      } finally {
        state.isFetchingLeaseRef.current = false;
        set({ loadingLeaseProps: false });
      }
    },
  };
});

export default usePropertyStore;
