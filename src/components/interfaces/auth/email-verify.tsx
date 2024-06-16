import { pb } from "@/services/pocketbase";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { FC, useEffect, useState } from "react";
import { BadgeAlert, BadgeCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useCountDown } from "@/components/hooks/use-countdown";

const VerificationRequest: FC<{ email: string }> = ({ email }) => {
  const [canRequestLink, setCanRequestLink] = useState(false);

  const { seconds, start, reset } = useCountDown(60, () => {
    setCanRequestLink(true);

    reset();
  });

  const resendVerificationLink = () => {
    pb.collection("users")
      .requestVerification(email!)
      .then(() => {
        setCanRequestLink(false);

        start();
      });
  };

  useEffect(() => {
    start();
  }, [start]);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Didn't receive the email? Check your spam or junk folder, or request a
        new one below.
      </p>

      <Button onClick={resendVerificationLink} disabled={!canRequestLink}>
        {canRequestLink ? "Resend verification link" : seconds}
      </Button>
    </div>
  );
};

export const VerificationOnboarding: FC<{ email?: string }> = ({ email }) => (
  <div className="m-auto flex flex-col items-center gap-3 p-2">
    <BadgeCheck className="size-20 stroke-1 text-center" />

    <p className="text-sm">
      Please check your email inbox. We have sent a verification link to your
      email. Click the link in the email to verify your account.
    </p>

    {email && <VerificationRequest email={email} />}

    <Separator />

    <Button className="w-full" asChild type="button" variant="outline">
      <Link to="/auth/login">Back to login</Link>
    </Button>
  </div>
);

export const VerificationAttempt: FC<{ token?: string }> = ({ token }) => {
  const [isValid, setIsValid] = useState(token ? undefined : false);

  useEffect(() => {
    if (token)
      pb.collection("users")
        .confirmVerification(token)
        .then(() => setIsValid(true))
        .catch(() => setIsValid(false));
  }, [token]);

  return (
    <div className="flex flex-col gap-4">
      {isValid && (
        <div className="flex flex-col items-center gap-4">
          <BadgeCheck className="size-20 stroke-1 text-center" />
          <p className="text-center text-sm">
            Your email address has been successfully verified!. You can now
            access all the features of your account.
          </p>
        </div>
      )}
      {isValid === false && (
        <div className="flex flex-col items-center gap-4">
          <BadgeAlert className="size-20 stroke-1 text-center" />
          <p className="text-center text-sm">
            We couldn't verify your email address. The verification link may
            have expired or been used already.
          </p>
        </div>
      )}
      <Button asChild className="w-full">
        <Link to="/auth/login">Back to login</Link>
      </Button>
    </div>
  );
};
