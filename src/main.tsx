import "@/styles/globals.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./route-tree.gen";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { isAuthenticated: undefined! },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <TanStackRouterDevtools router={router} />
  </React.StrictMode>,
);
