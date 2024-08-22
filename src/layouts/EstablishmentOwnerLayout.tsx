import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";

const Establishment = () => {
  return (
    <>
      <Header />
      <main className="mt-8">
        <Outlet />
      </main>
      <Navbar />
    </>
  );
};

export default Establishment;
