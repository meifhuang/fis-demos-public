import "@testing-library/jest-dom";
import LessonListRecord from "./LessonsListRecord";
import { Lesson } from "@/features/lessons";
import { LearnerProfile } from "@/lib/learner-profiles";
import { describe, test, expect, vi, beforeEach, Mock } from "vitest";
import { factory } from "@/test";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";

// Mock the next/navigation useRouter
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

// Mock the LearnerProfileChip component as it's an external dependency
vi.mock("@/lib/learner-profiles", async (importOriginal) => {
  const actual = (await importOriginal()) as Partial<
    typeof import("@/lib/learner-profiles")
  >;
  return {
    ...actual,
    LearnerProfileChip: ({
      learnerProfile,
      ...props
    }: {
      learnerProfile: LearnerProfile;
    }) => (
      <div data-testid="mock-learner-chip" {...props}>
        Learner Profile: {learnerProfile.label}
      </div>
    ),
  };
});

describe("LessonListRecord", () => {
  const data = factory.build("lesson", {
    id: crypto.randomUUID(),
  });
  const record = new Lesson(data);
  const mockPush = vi.fn();

  beforeEach(() => {
    mockPush.mockClear();

    // FIX: Use the imported 'Mock' type for assertion
    (useRouter as Mock).mockReturnValue({
      push: mockPush,
    });
  });

  test("should render lesson details and learner chip", () => {
    render(<LessonListRecord record={record} />);

    // Title and Content
    expect(screen.getByTestId("lesson-list-record-title")).toHaveTextContent(
      record.title,
    );
    expect(screen.getByTestId("lesson-list-record-content")).toHaveTextContent(
      record.content,
    );

    // Learner chip
    expect(screen.getByTestId("lesson-list-learner-chip")).toHaveTextContent(
      `Learner Profile: ${record.learnerProfile?.label}`,
    );
  });
});
