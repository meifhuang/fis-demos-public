import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../page";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";

describe("Home Page Content (Integration Test)", () => {
  it("renders the main heading and introductory text", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /Adaptive Learning/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Experience the future of creation/i)
    ).toBeInTheDocument();
  });

  it("renders the DemoCard components", () => {
    render(<Home />);

    const demoCards = screen.getAllByTestId("demo-card");
    const demoButtons = screen.getAllByTestId("demo-card-button");
    expect(demoCards).toHaveLength(3);
    expect(demoButtons).toHaveLength(3);

    demoCards.forEach((card) => expect(card).toBeInTheDocument());
    demoButtons.forEach((button) => expect(button).toBeInTheDocument());
  });

  it("navigates to the correct URL when a DemoCard button is clicked", async () => {
    render(<Home />);
    const user = userEvent.setup();
    const router = useRouter();
    router.push = vi.fn();

    const demoButtons = screen.getAllByTestId("demo-card-button");

    for (const button of demoButtons) {
      await user.click(button);
      expect(router.push).toHaveBeenCalledWith("/quiz-generator");
    }
  });

  it("renders the DashboardSection components", () => {
    render(<Home />);
    const sections = screen.getAllByTestId("dashboard-section");
    expect(sections.length).toBeGreaterThan(0);
  });
});
