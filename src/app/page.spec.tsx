import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";
import { mockFramerMotion } from "@/test-utils/mocks/framer-motion.mock";

// Mock framer-motion
mockFramerMotion();

// Mock the Counter component
vi.mock("../components/Counter", () => ({
  Counter: ({ onIncrement }: { onIncrement: () => void }) => (
    <button onClick={onIncrement}>Mock Increment</button>
  ),
}));

describe("Home Page (Unit Test)", () => {
  it("should increment its own count when the mock counter is clicked", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const countDisplay = screen.getByText("Count: 0");
    const mockButton = screen.getByRole("button", { name: "Mock Increment" });

    await user.click(mockButton);

    expect(countDisplay).toHaveTextContent("Count: 1");
  });
});
