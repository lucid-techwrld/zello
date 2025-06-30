import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <div className="min-h-screen w-full">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/join" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
