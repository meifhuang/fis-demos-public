import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
// Import Jest-DOM matchers
import "@testing-library/jest-dom/vitest";
import mockRouter from "next-router-mock";

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
