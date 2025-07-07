import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Signin2 from "./pages/Signin-two";
import Profile from "./pages/Profile";
import NearyBy from "./pages/NearyBy";
import ViewProduct from "./pages/ViewProduct";
import SearchResult from "./pages/SearchResult";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <div className="min-h-screen w-full ">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/nearby" element={<NearyBy />} />

          <Route path="/messages" element={<div>Messages</div>} />
          <Route path="/bookmarks" element={<div>Bookmarks</div>} />
          <Route path="/search/:search" element={<SearchResult />} />
        </Route>
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/view/:id" element={<ViewProduct />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/join" element={<SignIn />} />
        <Route path="/auth/join/info" element={<Signin2 />} />
      </Routes>
    </div>
  );
}

export default App;
