import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DemoCard from "./DemoCard";
import mockRouter from "next-router-mock";

describe("DemoCard (Unit Test)", () => {
  const mockProps = {
    title: "Quiz Generator Demo",
    description: "Generates personalized quizzes.",
    href: "/quiz-generator",
  };

  it("renders the title and description from props", () => {
    render(<DemoCard {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });

  it("navigates to the correct href when the button is clicked", async () => {
    const user = userEvent.setup();
    render(<DemoCard {...mockProps} />);

    const viewButton = screen.getByRole("button", { name: /View Demo/i });

    await user.click(viewButton);

    expect(mockRouter).toMatchObject({
      pathname: mockProps.href,
    });
  });

  it("renders the card header when imageSource is not provided", () => {
    render(
      <DemoCard
        title="Test Demo"
        description="This is a test description."
        href="/test-demo"
      />,
    );

    expect(screen.getByText("Test Demo")).toBeInTheDocument();
  });
});
