import Header from "./header";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Footer from "./Footer";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="grid grid-cols-12 min-h-screen">
      <NavBar isMenuOpen={isMenuOpen} handleMenu={handleMenu} />

      {/* Main content */}
      <div className="col-span-12 md:col-span-9 ">
        <Header handleMenu={handleMenu} />
        <main className="mt-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
