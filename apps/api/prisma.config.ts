import { defineConfig } from "prisma/config";
import * as dotenv from "dotenv";
import { join } from "node:path";

// prisma.config.ts runs in its own tsx context and does not inherit the shell
// env pre-processing that @nestjs/config does. Load .env explicitly so that
// DATABASE_URL is available when defineConfig is evaluated.
dotenv.config({ path: join(process.cwd(), ".env") });

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
