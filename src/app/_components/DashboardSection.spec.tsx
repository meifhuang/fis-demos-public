import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DashboardSection from "./DashboardSection";

describe("DashboardSection (Unit Test)", () => {
  it("renders its children content", () => {
    const testContent = "This content should be visible inside the section.";

    render(
      <DashboardSection heading="Test">
        <h1>{testContent}</h1>
      </DashboardSection>,
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it("renders the heading properly", () => {
    const headingText = "Test Heading";

    render(<DashboardSection heading={headingText} />);

    const heading = screen.getByRole("heading", {
      name: headingText,
      level: 1,
    });
    expect(heading).toBeInTheDocument();
  });
});
