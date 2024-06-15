import { createFileRoute } from "@tanstack/react-router";
import { Login } from "@/components/interfaces/auth/login";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="flex h-svh w-full items-center justify-center">
      <div className="max-w-sm flex-1">
        <Login />
      </div>
    </div>
  );
}
