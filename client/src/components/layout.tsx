import Header from "./header";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  return (
    <div className="w-full h-full ">
      <NavBar isMenuOpen={isMenuOpen} handleMenu={handleMenu} />
      <Header handleMenu={handleMenu} />
      <main className="mt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
