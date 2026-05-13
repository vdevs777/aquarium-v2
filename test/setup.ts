import "@testing-library/jest-dom";
import { vi } from "vitest";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

vi.mock("next/link", () => ({
  default: ({ children }: any) => children,
}));
