import { Schema } from "@/services/database";

export type User = Pick<
  Schema["users"]["response"],
  | "id"
  | "name"
  | "email"
  | "avatar"
  | "username"
  | "verified"
  | "updated"
  | "created"
>;
