import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";

const OwnerLayout = () => {
  return (
    <>
      <Header />
      <main className="mt-8 mb-20 p-4">
        <Outlet />
      </main>
      <Navbar />
    </>
  );
};

export default OwnerLayout;
