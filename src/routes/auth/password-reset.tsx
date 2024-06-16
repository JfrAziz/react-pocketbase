import { createFileRoute, redirect } from "@tanstack/react-router";
import {
  PasswordResetAttempt,
  PasswordResetRequest,
} from "@/components/interfaces/auth/password-reset";

export const Route = createFileRoute("/auth/password-reset")({
  component: ResetPassword,
  validateSearch: (search): { token?: string } => ({
    token: search.token?.toString(),
  }),
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) throw redirect({ to: "/" });
  },
});

function ResetPassword() {
  const search = Route.useSearch();

  return (
    <div className="flex h-svh w-full items-center justify-center">
      <div className="max-w-sm flex-1">
        {!search.token && <PasswordResetRequest />}
        {search.token && <PasswordResetAttempt token={search.token} />}
      </div>
    </div>
  );
}
