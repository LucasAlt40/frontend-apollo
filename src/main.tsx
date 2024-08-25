import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import Login from "./pages/login/Login.tsx";
import OwnerLayout from "./layouts/OwnerLayout.tsx";
import Home from "./pages/owner/home/Home.tsx";
import Playlist from "./pages/owner/playlist/Playlist.tsx";
import Player from "./pages/owner/player/Player.tsx";
import UserLayout from "./layouts/UserLayout.tsx";
import UserHome from "./pages/user/home/UserHome.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/owner",
    element: <OwnerLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "playlist",
        element: <Playlist />,
      },
      {
        path: "player",
        element: <Player />,
      },
    ],
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        path: "home",
        element: <UserHome />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
