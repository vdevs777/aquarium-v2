import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_MODE: z.enum(["mock", "production"]),
  NEXT_PUBLIC_API_URL: z.string(),
});

const _env = envSchema.safeParse({
  NEXT_PUBLIC_API_MODE: process.env.NEXT_PUBLIC_API_MODE,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

if (!_env.success) {
  console.error("❌ Invalid env:", _env.error.format());
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
