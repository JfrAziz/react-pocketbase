import { cn } from "@/utils/classnames";
import { RotateCw } from "lucide-react";
import { pb } from "@/services/pocketbase";
import { formHandler } from "@/utils/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClientResponseError } from "pocketbase";
import { Separator } from "@/components/ui/separator";
import { Link, useRouter } from "@tanstack/react-router";
import { useFormState } from "@/components/hooks/use-form-state";
import { FormError, FormField, FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";

export const LoginForm = () => {
  const router = useRouter();

  const form = useFormState({
    defaultValue: { identity: "", password: "" },
    validations: {
      identity: (value) =>
        !value.trim() ? "Username or email cannot be blank" : undefined,
      password: (value) =>
        !value.trim() ? "Password cannot be blank" : undefined,
    },
  });

  const loginWithPassword = () =>
    form.submit(async (data) => {
      pb.collection("users")
        .authWithPassword(data.identity, data.password)
        .then(() => router.navigate({ to: "/" }))
        .catch((err) => {
          if (err instanceof ClientResponseError)
            if (err.status === 403)
              pb.collection("users")
                .requestVerification(form.data.identity)
                .then(() =>
                  router.navigate({
                    to: "/auth/email-verification",
                    search: { email: data.identity },
                  }),
                );

          return form.setError("identity", (err as Error).message);
        });
    });

  return (
    <form
      onSubmit={formHandler(loginWithPassword)}
      className="m-auto flex flex-col gap-3 p-2"
    >
      <FormField>
        <FormLabel error={!!form.errors?.identity} htmlFor="identity">
          Username or Email
        </FormLabel>
        <Input
          name="identity"
          value={form.data.identity}
          disabled={form.isSubmitting}
          placeholder="email@example.com"
          onChange={(e) => form.setValue("identity", e.target.value)}
          className={cn(
            !!form.errors?.identity &&
              "border-destructive focus-visible:ring-destructive",
          )}
        />
        <FormError>{form.errors?.identity}</FormError>
      </FormField>

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

      <Label asChild>
        <Link to="/auth/password-reset">Forgot Password?</Link>
      </Label>

      <Button type="submit" className="space-x-2" disabled={form.isSubmitting}>
        {form.isSubmitting && <RotateCw className="size-4 animate-spin" />}
        <span>Login</span>
      </Button>

      <Separator />

      <Button variant="outline" asChild>
        <Link to="/auth/register">Register</Link>
      </Button>
    </form>
  );
};
