import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import extractAxiosErrorMessage from "../components/extractError";

interface UserContextType {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  login: (payload: LoginType) => Promise<boolean>;
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  fetchUserData: () => Promise<boolean>;
}

type LoginType = {
  email: string;
  password: string;
};

type UserData = {
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
};

const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const login = async (payload: LoginType): Promise<boolean> => {
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.status !== 200) {
        throw new Error("Fail to login");
      }

      console.log("Login Message:", res.data);
      await fetchUserData();
      setAuthenticated(true);
      return true;
    } catch (error) {
      console.log(error);
      const message = extractAxiosErrorMessage(error);
      console.log("Login Error", message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async (): Promise<boolean> => {
    setLoading(true);

    try {
      const res = await axios.get("http://localhost:5000/auth/profile", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.status === 200 && res.data?.profile) {
        setUser(res.data.profile);
        setAuthenticated(true);
        return true;
      }

      setAuthenticated(false);
      return false;
    } catch (error) {
      const message = extractAxiosErrorMessage(error);
      console.log("Fetch user error", message);
      setAuthenticated(false);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        login,
        authenticated,
        setAuthenticated,
        fetchUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
