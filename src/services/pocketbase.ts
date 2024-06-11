import { Schema } from "@/services/database";
import { TypedPocketBase } from "typed-pocketbase";
import PocketBase, { RecordService } from "pocketbase";

interface PB extends PocketBase {
  collection(idOrName: "users"): RecordService<Schema["users"]["response"]>;
}

/**
 * use this for standard pocketbase
 */
const pb = new PocketBase(import.meta.env.PB_URL || "/") as PB;

/**
 * use this for typesafety
 */
const db = new TypedPocketBase<Schema>(import.meta.env.PB_URL || "/");

export { pb, db };
