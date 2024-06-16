import { cn } from "@/utils/classnames";
import { RotateCw } from "lucide-react";
import { pb } from "@/services/pocketbase";
import { formHandler } from "@/utils/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClientResponseError } from "pocketbase";
import { useRouter } from "@tanstack/react-router";
import { useFormState } from "@/components/hooks/use-form-state";
import { FormError, FormField, FormLabel } from "@/components/ui/form";

export const Register = () => {
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
          pb.collection("users").requestVerification(data.email);

          return router.navigate({ to: "/auth/email-verify" });
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
        {form.isSubmitting && <RotateCw className="size-4 animate-spin" />}
        <span>Register</span>
      </Button>
    </form>
  );
};
