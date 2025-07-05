import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Signin2 from "./pages/Signin-two";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="min-h-screen w-full ">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/nearby" element={<div>Nearby</div>} />
          <Route path="/notifications" element={<div>Notifications</div>} />
          <Route path="/messages" element={<div>Messages</div>} />
          <Route path="/bookmarks" element={<div>Bookmarks</div>} />
        </Route>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/join" element={<SignIn />} />
        <Route path="/auth/join/info" element={<Signin2 />} />
      </Routes>
    </div>
  );
}

export default App;
