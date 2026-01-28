import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavigationLink from "./NavigationLink";
import { Navbar } from "@heroui/react";
import { useRouter } from "next/navigation";

describe("NavigationLink (Unit Test)", () => {
  const mockProps = {
    title: "Dashboard",
    href: "/",
  };

  it("renders the title and link correctly", () => {
    render(
      <Navbar>
        <NavigationLink {...mockProps} />
      </Navbar>,
    );

    const linkElement = screen.getByRole("link", { name: mockProps.title });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", mockProps.href);
  });

  it("applies underline when link is active", () => {
    useRouter().push("/");

    render(
      <Navbar>
        <NavigationLink {...mockProps} />
      </Navbar>,
    );

    const linkElement = screen.getByRole("link", { name: mockProps.title });
    // Minimal check for underline indicating active state
    expect(linkElement).toHaveStyle({ textDecoration: "underline" });
  });

  it("renders an icon if provided", () => {
    const mockIcon = <span data-testid="mock-icon">Icon</span>;
    render(
      <Navbar>
        <NavigationLink {...mockProps} icon={mockIcon} />
      </Navbar>,
    );

    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  it("handles user interaction correctly", async () => {
    const user = userEvent.setup();
    render(
      <Navbar>
        <NavigationLink {...mockProps} />
      </Navbar>,
    );

    const linkElement = screen.getByRole("link", { name: mockProps.title });

    await user.click(linkElement);
    expect(linkElement).toHaveFocus();
  });
});
