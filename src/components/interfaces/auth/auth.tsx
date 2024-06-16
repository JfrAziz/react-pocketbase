import { useState } from "react";
import { cn } from "@/utils/classnames";
import { pb } from "@/services/pocketbase";
import { formHandler } from "@/utils/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ClientResponseError } from "pocketbase";
import { Separator } from "@/components/ui/separator";
import { Link, useRouter } from "@tanstack/react-router";
import { useFormState } from "@/components/hooks/use-form-state";
import { IconBrandGithub, IconLoader2 } from "@tabler/icons-react";
import { FormError, FormField, FormLabel } from "@/components/ui/form";

const SocialAuth = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>();

  const login = async () => {
    setIsLoading(true);

    const openWindow = window.open();

    await pb
      .collection("users")
      .authWithOAuth2({
        provider: "github",
        urlCallback: (url) => {
          if (openWindow) openWindow.location.href = url;
        },
      })
      .then(() => router.navigate({ to: "/" }))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-col">
      <Button
        type="button"
        onClick={login}
        variant="outline"
        disabled={isLoading}
        className="space-x-2"
      >
        {isLoading && <IconLoader2 className="size-4 animate-spin" />}
        {!isLoading && <IconBrandGithub className="size-4" />}
        <span>Continue with Github</span>
      </Button>
    </div>
  );
};

/**
 * login form
 *
 * @returns
 */
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
        .catch(async (err) => {
          if (err instanceof ClientResponseError)
            if (err.status === 403)
              /**
               * if current user is unverified it will
               * return3 403, so we send verification link
               * to their identity.
               *
               * if the identity is not email (username), just
               * catch the error and don't do anything about it
               */
              await pb
                .collection("users")
                .requestVerification(data.identity)
                .then(() => {
                  return router.navigate({
                    to: "/auth/email-verification",
                    search: { email: data.identity },
                  });
                })
                .catch(() => ({}));

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
        {form.isSubmitting && <IconLoader2 className="size-4 animate-spin" />}
        <span>Login</span>
      </Button>

      <div className="text-center text-sm">
        <span>No Account Yet? </span>
        <Link to="/auth/register" className="font-bold">
          Register
        </Link>
      </div>

      <Separator />

      <SocialAuth />
    </form>
  );
};

/**
 * register form
 *
 * @returns
 */
export const RegisterForm = () => {
  const router = useRouter();

  const form = useFormState({
    defaultValue: {
      name: "",
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
    },
    validations: {
      name: (value) =>
        !value.trim() ? "Your Name cannot be blank" : undefined,
      email: (value) =>
        !value.trim()
          ? "Email cannot be blank"
          : !/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(value)
            ? "Email not valid"
            : undefined,
      username: (value) =>
        !value.trim()
          ? "Username cannot be blank"
          : !/^[a-zA-Z0-9_-]{3,15}$/.test(value)
            ? "Username only alphanumeric 3-15 characters"
            : undefined,
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

  const register = () =>
    form.submit(async (data) => {
      pb.collection("users")
        .create(data)
        .then(() => {
          pb.collection("users")
            .requestVerification(data.email)
            .then(() => {
              return router.navigate({
                to: "/auth/email-verification",
                search: { email: data.email },
              });
            });
        })
        .catch((err) => {
          if (!(err instanceof ClientResponseError))
            return form.setError("name", (err as Error).message);

          if (!err.data.data) return form.setError("name", err.message);

          for (const key in err.data.data)
            form.setError(
              key as keyof typeof form.data,
              err.data.data[key].message,
            );
        });
    });

  return (
    <form
      onSubmit={formHandler(register)}
      className="m-auto flex flex-col gap-3 p-2"
    >
      <FormField>
        <FormLabel error={!!form.errors?.name} htmlFor="name">
          Name
        </FormLabel>
        <Input
          name="name"
          value={form.data.name}
          disabled={form.isSubmitting}
          onChange={(e) => form.setValue("name", e.target.value)}
          className={cn(
            !!form.errors?.name &&
              "border-destructive focus-visible:ring-destructive",
          )}
        />
        <FormError>{form.errors?.name}</FormError>
      </FormField>

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

      <FormField>
        <FormLabel error={!!form.errors?.username} htmlFor="username">
          Username
        </FormLabel>
        <Input
          name="username"
          value={form.data.username}
          disabled={form.isSubmitting}
          onChange={(e) => form.setValue("username", e.target.value)}
          className={cn(
            !!form.errors?.username &&
              "border-destructive focus-visible:ring-destructive",
          )}
        />
        <FormError>{form.errors?.username}</FormError>
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

      <Button type="submit" className="space-x-2" disabled={form.isSubmitting}>
        {form.isSubmitting && <IconLoader2 className="size-4 animate-spin" />}
        <span>Register</span>
      </Button>

      <Separator />

      <Button asChild type="button" variant="outline">
        <Link to="/auth/login">Back to login</Link>
      </Button>
    </form>
  );
};
