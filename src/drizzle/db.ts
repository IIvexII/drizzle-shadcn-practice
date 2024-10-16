import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

// for migrations
const migrationClient = postgres(process.env.DATABASE_URL as string, { max: 1 });
migrate(drizzle(migrationClient), "./src/drizzle/migrations");

// for query purposes
const queryClient = postgres(process.env.DATABASE_URL as string);
export const db = drizzle(queryClient);
