import { createFileRoute, redirect } from "@tanstack/react-router";
import { VerificationOnboarding } from "@/components/interfaces/auth/email-verifications";

export const Route = createFileRoute("/auth/email-verification")({
  component: VerifyEmail,
  validateSearch: (search): { email?: string } => ({
    email: search.email?.toString(),
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
        <VerificationOnboarding email={router.email} />
      </div>
    </div>
  );
}
