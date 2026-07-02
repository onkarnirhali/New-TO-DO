/**
 * configuration.ts — the typed shape of all environment variables.
 *
 * This function is called once at startup by @nestjs/config.
 * It reads process.env, validates everything is present,
 * and returns a strongly-typed object.
 *
 * Why a function instead of just reading process.env inline?
 * Because this function is called ONCE and the result is cached.
 * Every service that needs config gets the same validated object.
 * If DATABASE_URL is missing, the app crashes here with a clear message
 * rather than at the first database query with a confusing error.
 */

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}\n` +
      `  → Copy apps/api/.env.example to apps/api/.env and fill in the values.`
    );
  }
  return value;
}

function optionalEnv(key: string, fallback = ""): string {
  return process.env[key] ?? fallback;
}

export function configuration() {
  return {
    // ── Server ──────────────────────────────────────────────────────
    port: parseInt(optionalEnv("PORT", "4000"), 10),
    nodeEnv: optionalEnv("NODE_ENV", "development"),
    isProduction: process.env["NODE_ENV"] === "production",

    // ── Database ─────────────────────────────────────────────────────
    database: {
      url: requireEnv("DATABASE_URL"),
    },

    // ── Redis ─────────────────────────────────────────────────────────
    redis: {
      url: requireEnv("REDIS_URL"),
    },

    // ── Clerk Authentication ──────────────────────────────────────────
    clerk: {
      secretKey:     requireEnv("CLERK_SECRET_KEY"),
      webhookSecret: optionalEnv("CLERK_WEBHOOK_SECRET"),
    },

    // ── CORS ──────────────────────────────────────────────────────────
    allowedOrigins: optionalEnv("ALLOWED_ORIGINS", "http://localhost:3000")
      .split(",")
      .map(o => o.trim()),

    // ── Cloudflare R2 (added when needed in Milestone 13) ────────────
    r2: {
      accountId:       optionalEnv("R2_ACCOUNT_ID"),
      accessKeyId:     optionalEnv("R2_ACCESS_KEY_ID"),
      secretAccessKey: optionalEnv("R2_SECRET_ACCESS_KEY"),
      bucketName:      optionalEnv("R2_BUCKET_NAME", "planote-dev"),
    },

    // ── AI Services (added in Milestone 18) ───────────────────────────
    ai: {
      anthropicApiKey:    optionalEnv("ANTHROPIC_API_KEY"),
      openaiApiKey:       optionalEnv("OPENAI_API_KEY"),
      googleCloudApiKey:  optionalEnv("GOOGLE_CLOUD_API_KEY"),
    },
  };
}

/** The inferred type of our config — used in ConfigService below. */
export type AppConfiguration = ReturnType<typeof configuration>;
