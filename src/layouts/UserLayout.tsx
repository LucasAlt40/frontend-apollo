import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const UserLayout = () => {
  return (
    <>
      <Header variant="white" />
      <main className="mt-8 mb-20 p-4">
        <Outlet />
      </main>
    </>
  );
};

export default UserLayout;
