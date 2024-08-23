import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";

const OwnerLayout = () => {
  return (
    <>
      <Header />
      <main className="mt-8 p-3">
        <Outlet />
      </main>
      <Navbar />
    </>
  );
};

export default OwnerLayout;
