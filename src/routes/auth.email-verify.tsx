import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/email-verify")({
  component: () => <div>Hello /_auth/email-verify!</div>,
});
