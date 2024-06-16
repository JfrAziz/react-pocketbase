import { createFileRoute, redirect } from "@tanstack/react-router";
import { VerificationAttempt } from "@/components/interfaces/auth/email-verifications";

export const Route = createFileRoute("/auth/email-verification-confirm")({
  component: VerifyEmail,
  validateSearch: (search): { token?: string } => ({
    token: search.token?.toString(),
  }),
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) throw redirect({ to: "/" });
  },
});

function VerifyEmail() {
  const router = Route.useSearch();

  return (
    <div className="flex h-svh w-full items-center justify-center">
      <div className="max-w-sm flex-1">
        <VerificationAttempt token={router.token} />
      </div>
    </div>
  );
}
