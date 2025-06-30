import Header from "./header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header />
      <main className="mt-14">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
