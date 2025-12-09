// Import Jest-DOM matchers
import "@testing-library/jest-dom/vitest";
import "dotenv/config";
import mockRouter from "next-router-mock";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Run cleanup after each test case (e.g., unmount components)
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

beforeEach(() => {
  vi.mock("next/navigation", () => ({
    useRouter: () => mockRouter,
    usePathname: () => mockRouter.pathname,
  }));
  mockRouter.reset();
});
