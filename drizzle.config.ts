import { type Config } from "drizzle-kit"

import { env } from "./src/env.mjs"

export default {
  schema: "./src/db/schema.ts",
  driver: "pg",
  out: "./migrations",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config
