import * as dotenv from "dotenv"
import type { Config } from "drizzle-kit"

dotenv.config({ path: ".env" })

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing")
}
export default {
  schema: "./src/db/schema.ts",
  driver: "pg",
  out: "./migrations",
} satisfies Config
