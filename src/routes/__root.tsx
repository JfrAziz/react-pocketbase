import { pb } from "@/services/pocketbase";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

interface RouteContext {
  isAuthenticated: boolean;
}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: Outlet,
  beforeLoad: () => {
    const isAuthenticated = pb.authStore.isValid;

    return { isAuthenticated: isAuthenticated };
  },
});
