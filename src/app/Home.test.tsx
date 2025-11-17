import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page"; // Import the whole page
import { mockFramerMotion } from "@/test-utils/mocks/framer-motion.mock";
import { mockHeroUI } from "@/test-utils/mocks/hero-ui.mock";

// --- Mock 3rd Party Libs ---
mockFramerMotion();
mockHeroUI();
// ----------------------------

describe("Home Page (Integration Test)", () => {
  it("should update the count on the page when the real counter button is clicked", async () => {
    const user = userEvent.setup();
    render(<Home />);

    // This text is in `app/page.tsx`
    const countDisplay = screen.getByText("Count: 0");
    // This button is rendered by `app/components/Counter.tsx`
    const incrementButton = screen.getByRole("button", { name: "Increment" });

    // Check initial state
    expect(countDisplay).toBeInTheDocument();

    // Click the button
    await user.click(incrementButton);

    // Check updated state
    expect(countDisplay).toHaveTextContent("Count: 1");
  });
});
