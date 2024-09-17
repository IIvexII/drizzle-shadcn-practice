# Drizzle

```bash
# Installation
pnpm add drizzle-orm postgres dotenv
pnpm add -D drizzle-kit
```

```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
});
```

```tsx
// src/drizzle/schema.ts
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
 id: uuid("id").primaryKey().defaultRandom(),
 name: varchar("name", {length: 255}).notNull()
});
```

```tsx
// src/drizzle/db.ts
// specific for postgresql-js driver
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
```

```env
// .env
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<db>"
```

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```
