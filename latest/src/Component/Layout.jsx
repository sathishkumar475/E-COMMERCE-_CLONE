import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function Layout() {
  return (
    <>
      <NavBar />
      <div className="container mt-3">
        <Outlet /> {/* Child routes render here */}
      </div>
    </>
  );
}

export default Layout;
