import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "./Counter";
import { mockHeroUI } from "@/test-utils/mocks/hero-ui.mock";

mockHeroUI();

describe("Counter Component (Unit Test)", () => {
  it("should call onIncrement when the button is clicked", async () => {
    const user = userEvent.setup();
    const mockIncrement = vi.fn();
    render(<Counter onIncrement={mockIncrement} />);

    const incrementButton = screen.getByRole("button", { name: "Increment" });
    await user.click(incrementButton);

    expect(mockIncrement).toHaveBeenCalledTimes(1);
  });
});
