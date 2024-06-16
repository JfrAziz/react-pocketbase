import { createFileRoute } from "@tanstack/react-router";
import {
  PasswordResetConfirm,
  PasswordResetRequest,
} from "@/components/interfaces/auth/password-reset";

export const Route = createFileRoute("/auth/password-reset")({
  component: ResetPassword,
  validateSearch: (search): { token?: string } => ({
    token: search.token?.toString(),
  }),
});

function ResetPassword() {
  const search = Route.useSearch();

  return (
    <div className="flex h-svh w-full items-center justify-center">
      <div className="max-w-sm flex-1">
        {!search.token && <PasswordResetRequest />}
        {search.token && <PasswordResetConfirm token={search.token} />}
      </div>
    </div>
  );
}
