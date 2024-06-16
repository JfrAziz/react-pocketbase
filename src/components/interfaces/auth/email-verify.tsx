import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const EmailVerifyRequest = () => (
  <div className="m-auto flex flex-col gap-3 p-2">
    <p className="text-sm">
      Please check your email inbox. We have sent a verification link to your
      email. Click the link in the email to verify your account.
    </p>

    <Button type="button" variant="outline">
      <Link to="/auth/login">Back to login</Link>
    </Button>
  </div>
);
