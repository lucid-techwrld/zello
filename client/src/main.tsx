import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { UserProvider } from "./hooks/userContext.tsx";
import { PropertyProvider } from "./hooks/propertieContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <PropertyProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PropertyProvider>
    </UserProvider>
  </StrictMode>
);
