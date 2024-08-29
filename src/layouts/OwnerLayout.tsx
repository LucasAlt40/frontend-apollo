import { Outlet, redirect, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import { getDecodedAccessToken } from "../utils";

const OwnerLayout = () => {
  const location = useLocation();
  const accessToken = getDecodedAccessToken();

  if (!accessToken || accessToken?.scope) redirect("/");

  const variant =
    location.pathname === "/owner/player" ? "white" : "rose";

  return (
    <>
      <Header variant={variant} />
      <main className="mt-8 mb-20 p-4">
        <Outlet />
      </main>
      <Navbar variant={variant} />
    </>
  );
};

export default OwnerLayout;
