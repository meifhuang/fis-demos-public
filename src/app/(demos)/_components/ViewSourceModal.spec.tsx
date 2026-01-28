import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ViewSourceModal } from "./ViewSourceModal";

// --- MOCK DATA ---
const MARKDOWN_CONTENT = `
# Source Lesson Title

This is **bold text**.

- Item one
- Item two
`;

describe("ViewSourceModal (Snapshot)", () => {
  it("should match snapshot when open with markdown content", () => {
    const { container } = render(
      <ViewSourceModal
        isOpen={true}
        onClose={vi.fn()}
        title="Source Material"
        markdown={MARKDOWN_CONTENT}
      />,
    );

    // Snapshot ensures modal layout + markdown rendering remain stable
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot when closed", () => {
    const { container } = render(
      <ViewSourceModal
        isOpen={false}
        onClose={vi.fn()}
        title="Source Material"
        markdown={MARKDOWN_CONTENT}
      />,
    );

    // Snapshot ensures nothing renders when modal is closed
    expect(container).toMatchSnapshot();
  });
});

describe("ViewSourceModal (Behavior)", () => {
  it("renders the modal content when open", () => {
    render(
      <ViewSourceModal
        isOpen={true}
        onClose={vi.fn()}
        title="Source Material"
        markdown={MARKDOWN_CONTENT}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Source Material" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Source Lesson Title" }),
    ).toBeInTheDocument();
  });

  it("calls onClose when header close button is clicked", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(
      <ViewSourceModal
        isOpen={true}
        onClose={onClose}
        title="Source Material"
        markdown={MARKDOWN_CONTENT}
      />,
    );

    await user.click(screen.getByLabelText("Close"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when footer Close button is clicked", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(
      <ViewSourceModal
        isOpen={true}
        onClose={onClose}
        title="Source Material"
        markdown={MARKDOWN_CONTENT}
      />,
    );

    const dialog = screen.getByRole("dialog");

    const footer = within(dialog).getByRole("contentinfo");

    const closeButton = within(footer).getByRole("button", {
      name: "Close modal",
    });

    await user.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
