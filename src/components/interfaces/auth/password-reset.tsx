import { FC, useState } from "react";
import { cn } from "@/utils/classnames";
import { pb } from "@/services/pocketbase";
import { formHandler } from "@/utils/form";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useFormState } from "@/components/hooks/use-form-state";
import { FormError, FormField, FormLabel } from "@/components/ui/form";
import {
  IconLoader2,
  IconCircleCheck,
  IconExclamationCircle,
} from "@tabler/icons-react";

export const PasswordResetRequest = () => {
  const [requestSend, setRequestSend] = useState(false);

  const form = useFormState({
    defaultValue: { email: "" },
    validations: {
      email: (value) =>
        !value.trim()
          ? "Email cannot be blank"
          : !/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(value)
            ? "Email not valid"
            : undefined,
    },
  });

  const requestResetPassword = () =>
    form.submit(async (data) => {
      pb.collection("users")
        .requestPasswordReset(data.email)
        .then(() => setRequestSend(true))
        .catch((err) => form.setError("email", (err as Error).message));
    });

  return (
    <div className="flex flex-col gap-y-2 p-2">
      {!requestSend && (
        <form
          onSubmit={formHandler(requestResetPassword)}
          className="m-auto flex flex-col gap-3"
        >
          <p className="text-sm">
            Enter the email associated with your account, and we'll send you the
            verification code to reset your password.
          </p>

          <FormField>
            <FormLabel error={!!form.errors?.email} htmlFor="email">
              Email
            </FormLabel>
            <Input
              name="email"
              type="email"
              value={form.data.email}
              disabled={form.isSubmitting}
              placeholder="email@example.com"
              onChange={(e) => form.setValue("email", e.target.value)}
              className={cn(
                !!form.errors?.email &&
                  "border-destructive focus-visible:ring-destructive",
              )}
            />
            <FormError>{form.errors?.email}</FormError>
          </FormField>

          <Button
            type="submit"
            className="space-x-2"
            disabled={form.isSubmitting}
          >
            {form.isSubmitting && (
              <IconLoader2 className="size-4 animate-spin" />
            )}
            <span>Reset Password</span>
          </Button>
        </form>
      )}

      {requestSend && (
        <p className="text-sm">
          The password reset link has been sent to your email {form.data.email}
        </p>
      )}

      <Separator />

      <Button variant="outline" asChild>
        <Link to="/auth/login">Back to Login</Link>
      </Button>
    </div>
  );
};

export const PasswordResetAttempt: FC<{ token?: string }> = ({ token }) => {
  const [passwordReseted, setPasswordReseted] = useState(false);

  const form = useFormState({
    defaultValue: {
      password: "",
      passwordConfirm: "",
    },
    validations: {
      password: (value) =>
        !value.trim()
          ? "Password cannot be blank"
          : !/^[A-Za-z\d]{8,}$/.test(value)
            ? "Password minimum 8 chracters"
            : undefined,
      passwordConfirm: (value, data) =>
        !value.trim()
          ? "Password confirmation cannot be blank"
          : data.password !== value
            ? "password confirmation does not match"
            : undefined,
    },
  });

  const changePassword = () =>
    form.submit(async (data) => {
      if (token)
        pb.collection("users")
          .confirmPasswordReset(token, data.password, data.passwordConfirm)
          .then(() => setPasswordReseted(true))
          .catch((err) => form.setError("password", (err as Error).message));
    });

  return (
    <div className="flex flex-col gap-3 space-y-2 p-2">
      {token && !passwordReseted && (
        <form
          onSubmit={formHandler(changePassword)}
          className="m-auto flex w-full flex-col gap-3"
        >
          <FormField>
            <FormLabel error={!!form.errors?.password} htmlFor="password">
              Password
            </FormLabel>
            <Input
              name="password"
              type="password"
              value={form.data.password}
              disabled={form.isSubmitting}
              onChange={(e) => form.setValue("password", e.target.value)}
              className={cn(
                !!form.errors?.password &&
                  "border-destructive focus-visible:ring-destructive",
              )}
            />
            <FormError>{form.errors?.password}</FormError>
          </FormField>

          <FormField>
            <FormLabel
              error={!!form.errors?.passwordConfirm}
              htmlFor="passwordConfirm"
            >
              Password Confirmation
            </FormLabel>
            <Input
              type="password"
              name="passwordConfirm"
              value={form.data.passwordConfirm}
              disabled={form.isSubmitting}
              onChange={(e) => form.setValue("passwordConfirm", e.target.value)}
              className={cn(
                !!form.errors?.passwordConfirm &&
                  "border-destructive focus-visible:ring-destructive",
              )}
            />
            <FormError>{form.errors?.passwordConfirm}</FormError>
          </FormField>

          <Button
            type="submit"
            className="space-x-2"
            disabled={form.isSubmitting}
          >
            {form.isSubmitting && (
              <IconLoader2 className="size-4 animate-spin" />
            )}
            <span>Reset Password</span>
          </Button>
        </form>
      )}

      {token && passwordReseted && (
        <div className="flex flex-col items-center gap-4">
          <IconCircleCheck className="size-20 stroke-1 text-center" />
          <p className="text-center text-sm">
            Your password has been successfully reseted!. You can now login with
            your new password to your account.
          </p>
        </div>
      )}

      {!token && (
        <div className="flex flex-col items-center gap-4">
          <IconExclamationCircle className="size-20 stroke-1 text-center" />
          <p className="text-center text-sm">
            The password reset link is invalid or has expired. Please request a
            new password reset link.
          </p>
          <Button className="w-full" asChild type="button">
            <Link to="/auth/password-reset">Request new password</Link>
          </Button>
        </div>
      )}

      <Separator />

      <Button asChild type="button" variant="outline">
        <Link to="/auth/login">Back to login</Link>
      </Button>
    </div>
  );
};
