import { Outlet } from "react-router-dom";
import NavbarTop from "./Navbartop";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <NavbarTop />
      <main>
        <Outlet /> {/* All page content goes here */}
      </main>
      <Footer />
    </>
  );
}