import { Outlet } from "react-router-dom";
import Navbar from "../components/client/Navbar";
import Footer from "../components/client/Footer";

const ClientLayout = () => {
  return (
    <>

      <Navbar />
      <Outlet />

      <Footer />
    </>
  );
};

export default ClientLayout;