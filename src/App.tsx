import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
