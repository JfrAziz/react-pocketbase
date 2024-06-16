import { createFileRoute } from "@tanstack/react-router";
import { EmailVerifyRequest } from "@/components/interfaces/auth/email-verify";

export const Route = createFileRoute("/auth/email-verify")({
  component: VerifyEmail,
});

function VerifyEmail() {
  return (
    <div className="flex h-svh w-full items-center justify-center">
      <div className="max-w-sm flex-1">
        <EmailVerifyRequest />
      </div>
    </div>
  );
}
