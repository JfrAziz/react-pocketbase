import { pb } from "@/services/pocketbase";
import { formHandler } from "@/utils/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "@tanstack/react-router";
import { useFormState } from "@/components/hooks/use-form-state";
import { FormError, FormField, FormLabel } from "@/components/ui/form";

export const Login = () => {
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
        .then((data) => {
          if (data.record.verified) return router.navigate({ to: "/" });

          return router.navigate({ to: "/auth/email-verify" });
        })
        .catch((err) => form.setError("identity", (err as Error).message));
    });

  return (
    <form
      onSubmit={formHandler(loginWithPassword)}
      className="m-auto flex flex-col gap-3 p-2"
    >
      <FormField>
        <FormLabel htmlFor="identity">Username or Email</FormLabel>
        <Input
          name="identity"
          value={form.data.identity}
          disabled={form.isSubmitting}
          placeholder="email@example.com"
          onChange={(e) => form.setValue("identity", e.target.value)}
        />
        <FormError>{form.errors?.identity}</FormError>
      </FormField>

      <FormField>
        <FormLabel htmlFor="password">Username or Email</FormLabel>
        <Input
          name="password"
          type="password"
          value={form.data.password}
          disabled={form.isSubmitting}
          onChange={(e) => form.setValue("password", e.target.value)}
        />
        <FormError>{form.errors?.password}</FormError>
      </FormField>

      <Button type="submit" disabled={form.isSubmitting}>
        Login
      </Button>
    </form>
  );
};
