import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Profile from "./pages/Profile";
import NearyBy from "./pages/NearyBy";
import ViewProduct from "./pages/ViewProduct";
import SearchResult from "./pages/SearchResult";
import Notifications from "./pages/Notifications";
import OtpPage from "./pages/OtpPage";
import RequestOTP from "./pages/RequestOTP";
import ForgottenPassword from "./pages/ForgottenPassword";
import { useUser } from "./hooks/userContext";
import { useEffect, useState } from "react";
import LoadingScreen from "./pages/LoadingScree";
import FAQ from "./pages/faq";
import AboutUs from "./pages/about";
import ViewProfile from "./pages/ViewProfile";
import ListProperty from "./pages/AddPropety";
import ProtectedRoute from "./components/protectedRoute";
import AddInfo from "./pages/AddInfo";

function App() {
  const { authenticated, setAuthenticated, fetchUserData, user } = useUser();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const auth = await fetchUserData();
        if (!auth) setAuthenticated(false);
      } catch (err) {
        console.error("Auth check failed:", err);
        setAuthenticated(false);
      } finally {
        setInitialized(true);
      }
    };

    checkAuth();
  }, []);

  if (!initialized) return <LoadingScreen />;

  return (
    <div className="min-h-screen w-full">
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={authenticated}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={authenticated}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/profile/view" element={<ViewProfile />} />
          <Route path="/nearby" element={<NearyBy />} />
          <Route path="/messages" element={<div>Messages</div>} />
          <Route path="/bookmarks" element={<div>Bookmarks</div>} />
          <Route path="/search/:search" element={<SearchResult />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<AboutUs />} />
          <Route
            path="/add"
            element={
              user?.role === "lease" ? (
                <ListProperty />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Route>

        <Route path="/notifications" element={<Notifications />} />
        <Route path="/view/:id" element={<ViewProduct />} />

        {/* Auth routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/join" element={<Signup />} />
        <Route path="/auth/join/info/:id" element={<AddInfo />} />
        <Route path="/auth/otp/:email" element={<OtpPage />} />
        <Route path="/auth/request-otp" element={<RequestOTP />} />
        <Route
          path="/auth/forgotten-password/:email"
          element={<ForgottenPassword />}
        />
      </Routes>
    </div>
  );
}

export default App;
