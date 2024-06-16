import { createFileRoute } from "@tanstack/react-router";
import { Register } from "@/components/interfaces/auth/register";

export const Route = createFileRoute("/auth/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="flex h-svh w-full items-center justify-center">
      <div className="max-w-sm flex-1">
        <Register />
      </div>
    </div>
  );
}
