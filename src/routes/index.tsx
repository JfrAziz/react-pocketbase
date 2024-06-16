import { pb } from "@/services/pocketbase";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  const router = useRouter();

  const ctx = Route.useRouteContext();

  const logout = () => {
    pb.authStore.clear();

    router.navigate({ to: "/" });
  };

  return (
    <div className="flex h-svh w-full items-center justify-center">
      <div className="flex max-w-sm flex-1 flex-col gap-4">
        {ctx.isAuthenticated && (
          <>
            <Button asChild>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="outline" onClick={logout}>
              Log Out
            </Button>
          </>
        )}
        {!ctx.isAuthenticated && (
          <Button asChild>
            <Link to="/auth/login">Log In</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
