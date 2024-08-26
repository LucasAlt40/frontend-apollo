import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";

import Login from "./pages/login/Login.tsx";
import OwnerLayout from "./layouts/OwnerLayout.tsx";
import OwnerHome from "./pages/owner/home/Home.tsx";
import Playlist from "./pages/owner/playlist/Playlist.tsx";
import Player from "./pages/owner/player/Player.tsx";
import UserLayout from "./layouts/UserLayout.tsx";
import UserHome from "./pages/user/home/Home.tsx";
import theme from "./assets/theme.ts";

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
        index: true,
        element: <Navigate to="/owner/home" />,
      },
      {
        path: "home",
        element: <OwnerHome />,
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
        index: true,
        element: <Navigate to="/user/home" />,
      },
      {
        path: "home",
        element: <UserHome />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>
);
