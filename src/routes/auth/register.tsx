import { createFileRoute, redirect } from "@tanstack/react-router";
import { RegisterForm } from "@/components/interfaces/auth/auth";

export const Route = createFileRoute("/auth/register")({
  component: RegisterPage,
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) throw redirect({ to: "/" });
  },
});

function RegisterPage() {
  return (
    <div className="flex h-svh w-full items-center justify-center">
      <div className="max-w-sm flex-1">
        <RegisterForm />
      </div>
    </div>
  );
}
