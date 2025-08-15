import { create } from "zustand";
import axios from "axios";
import extractAxiosErrorMessage from "../components/extractError";

interface LoadingState {
  SignUp: boolean;
  SignIn: boolean;
  UpdateUser: boolean;
  UserData: boolean;
  UserDetails: boolean;
}

interface UserStore {
  User: UserData | null;
  setLoading: (key: keyof LoadingState, value: boolean) => void;
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  fetchUserData: () => Promise<boolean>;
  logOut: () => Promise<boolean>;
  login: (payload: UserCredential) => Promise<boolean>;
  updateUserDetails: (userDetails: Partial<UserData>) => Promise<boolean>;
  createUser: (
    payload: UserCredential
  ) => Promise<{ res: any; success: boolean; message: string } | false>;
  addUserDetails: (payload: UserInfo) => Promise<boolean>;
  loading: LoadingState;
}

type UserCredential = {
  email: string;
  password: string;
};

interface UserData {
  id: string;
  email: string;
  avatar: string;
  first_name: string;
  last_name: string;
  role: string;
  dob: string;
  street: string;
  city: string;
  state: string;
  country: string;
}

type UserInfo = {
  role: string;
  userId: string;
  address: {
    street: FormDataEntryValue;
    city: FormDataEntryValue;
    state: FormDataEntryValue;
    country: FormDataEntryValue;
  };
};

const useUserStore = create<UserStore>((set, get) => {
  return {
    User: null,
    isAuthenticated: false,
    loading: {
      SignUp: false,
      SignIn: false,
      UpdateUser: false,
      UserData: false,
      UserDetails: false,
    },

    setLoading: (key: keyof LoadingState, value: boolean) => {
      set((state) => ({
        loading: { ...state.loading, [key]: value },
      }));
    },

    setAuthenticated: (value: boolean) => {
      set({ isAuthenticated: value });
    },

    login: async (payload: UserCredential): Promise<boolean> => {
      const setLoading = get().setLoading;
      const fetchUserData = get().fetchUserData;
      setLoading("SignIn", true);
      try {
        const res = await axios.post("/auth/login", payload, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (res.status !== 200) {
          throw new Error("Fail to login");
        }

        console.log("Login Message:", res.data);
        await fetchUserData();
        set(() => ({
          isAuthenticated: true,
        }));
        return true;
      } catch (error) {
        console.log(error);
        const message = extractAxiosErrorMessage(error);
        console.log("Login Error", message);
        return false;
      } finally {
        setLoading("SignIn", false);
      }
    },

    logOut: async (): Promise<boolean> => {
      try {
        const res = await axios.get("/auth/logout", {
          withCredentials: true,
        });

        if (res.status !== 200) {
          throw new Error("Fail to log out");
        }

        console.log(res.data);
        set(() => ({
          User: null,
          isAuthenticated: false,
        }));
        return true;
      } catch (error) {
        const message = extractAxiosErrorMessage(error);
        console.log(message);
        return false;
      }
    },

    createUser: async (
      payload: UserCredential
    ): Promise<{ res: any; success: boolean; message: string } | false> => {
      const setLoading = get().setLoading;
      setLoading("SignUp", true);
      try {
        const res = await axios.post("/auth/register", payload, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (res.status !== 201) {
          throw new Error("Failed to create user");
        }

        console.log("User created successfully:", res.data);
        return { res: res.data, success: true, message: res.data.message };
      } catch (error) {
        const message = extractAxiosErrorMessage(error);
        console.log("Signup Error:", message);
        return { res: null, success: false, message };
      } finally {
        setLoading("SignUp", false);
      }
    },

    fetchUserData: async (): Promise<boolean> => {
      const setLoading = get().setLoading;
      setLoading("UserData", true);

      try {
        const res = await axios.get("/user/profile", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (res.status === 200 && res.data?.profile) {
          set({
            User: res.data.profile,
            isAuthenticated: true,
          });
          return true;
        }

        set({
          User: null,
          isAuthenticated: false,
        });
        return false;
      } catch (error) {
        const message = extractAxiosErrorMessage(error);
        console.log("Fetch user error", message);
        set({
          User: null,
          isAuthenticated: false,
        });
        return false;
      } finally {
        setLoading("UserData", false);
      }
    },

    updateUserDetails: async (
      userDetails: Partial<UserData>
    ): Promise<boolean> => {
      const setLoading = get().setLoading;
      const fetchUserData = get().fetchUserData;
      setLoading("UpdateUser", true);
      console.log("Updating user details", userDetails);
      try {
        const res = await axios.patch("/user/update-info", userDetails, {
          withCredentials: true,
        });

        if (res.status !== 200) {
          throw new Error("Failed to update user details");
        }

        console.log("User details updated successfully", res.data);
        await fetchUserData();
        return true;
      } catch (error) {
        const message = extractAxiosErrorMessage(error);
        console.log("Update user details error", message);
        return false;
      } finally {
        setLoading("UpdateUser", false);
      }
    },

    addUserDetails: async (payload: UserInfo): Promise<boolean> => {
      const setLoading = get().setLoading;
      setLoading("UserDetails", true);
      try {
        const res = await axios.post("/auth/add-details", payload, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        if (res.status !== 201) throw new Error("Failed to add details");
        return true;
      } catch (error) {
        const message = extractAxiosErrorMessage(error);
        console.log("Add user details error", message);
        return false;
      } finally {
        setLoading("UserDetails", false);
      }
    },
  };
});

export default useUserStore;
export type { UserData, UserCredential, UserInfo };
