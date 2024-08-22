import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login.tsx";
import Establishment from "./layouts/EstablishmentOwnerLayout.tsx";
import Home from "./pages/home/Home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/establishment",
    element: <Establishment />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
