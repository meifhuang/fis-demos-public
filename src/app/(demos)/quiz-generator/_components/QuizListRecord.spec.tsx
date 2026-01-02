import "@testing-library/jest-dom";
import QuizListRecord from "./QuizListRecord";
import { Quiz } from "../_models";
import { LearnerProfile } from "@/lib/learner-profiles";
import { describe, test, expect, vi, beforeEach, Mock } from "vitest";
import { factory } from "@/test";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";

// Mock the next/navigation useRouter
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

// Mock the LearnerProfileChip component as it's an external dependency
vi.mock("@/lib/learner-profiles", async (importOriginal) => {
  const actual = (await importOriginal()) as Partial<typeof import("@/lib/learner-profiles")>
  return {
    ...actual,
    LearnerProfileChip: ({ learnerProfile, ...props }: { learnerProfile: LearnerProfile }) => (
      <div data-testid="mock-learner-chip" {...props}>
        Learner Profile: {learnerProfile.label}
      </div>
    ),
  }
});

// Mock the delete mutation hook
const mockDeleteMutation = vi.fn();
const mockIsDeleting = vi.fn(() => false); // Use a mock function to control state easily
vi.mock("../_store/useDeleteQuiz", () => {
  return {
    useDeleteQuiz: vi.fn(() => ({
      mutate: mockDeleteMutation,
      isPending: mockIsDeleting(),
    })),
  };
});

// Mock the ConfirmationDialog component (Declare globally)
// const MockConfirmationDialog = vi.fn(() => null);

describe("QuizListRecord", () => {
  const data = factory.build("quiz", { id: crypto.randomUUID() });
  const record = new Quiz(data);
  const mockPush = vi.fn();

  beforeEach(() => {
    mockPush.mockClear();

    // FIX: Use the imported 'Mock' type for assertion
    (useRouter as Mock).mockReturnValue({
      push: mockPush,
    });
  });

  test("should render quiz details and learner chip correctly", () => {
    render(<QuizListRecord record={record} />);

    // Title and Description
    expect(
      screen.getByTestId("quiz-list-record-title")
    ).toHaveTextContent(record.title);

    expect(
      screen.getByTestId("quiz-list-record-description")
    ).toHaveTextContent(record.description);

    // Duration/Lesson details
    expect(
      screen.getByTestId("quiz-list-total-questions")
    ).toHaveTextContent(`${record.questionCount} questions`);

    // Learner chip
    expect(
      screen.getByTestId("quiz-list-learner-chip")
    ).toHaveTextContent(`Learner Profile: ${record.learnerProfile?.label}`);
  });

  test("should avoid impromper pluralization", () => {
    const newData = factory.build("quiz", {
      questions: [
        factory.build("question")
      ]
    });
    const newRecord = new Quiz(newData);

    render(<QuizListRecord record={newRecord} />);
    expect(
      screen.getByTestId("quiz-list-total-questions")
    ).toHaveTextContent("1 question");
  });

  test("should navigate to view route when View button is clicked", () => {
    render(<QuizListRecord record={record} />);

    const viewButton = screen.getByTestId("quiz-list-button-view");
    fireEvent.click(viewButton);

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith(`/quiz-generator/${record.id}`);
  });

  test("should navigate to edit route when Edit button is clicked", () => {
    render(<QuizListRecord record={record} />);

    const editButton = screen.getByTestId("quiz-list-button-edit");
    fireEvent.click(editButton);

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith(
      `/quiz-generator/${record.id}/edit`
    );
  });
});
