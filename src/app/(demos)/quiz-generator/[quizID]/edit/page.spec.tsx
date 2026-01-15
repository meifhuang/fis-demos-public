import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuizEditView from "./page";
import { Quiz } from "../../_models";
import { factory } from "@/test";
import { addToast } from "@heroui/react";

// ---------- Mocks ----------

// Mock router
const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useParams: () => ({
    quizID: "test-id",
  }),
}));

// Mock HeroUI addToast
vi.mock("@heroui/react", async () => {
  const actual = await vi.importActual("@heroui/react");
  return {
    ...actual,
    addToast: vi.fn(),
  };
});

// Mock useEditQuiz
const saveChangesMock = vi.fn();
const cancelChangesMock = vi.fn();

const mockQuizData = factory.build("quiz", {
  title: "Test Quiz",
  description: "A description",
});

vi.mock("../_hooks/useEditQuiz", () => ({
  useEditQuiz: () => ({
    quiz: new Quiz(mockQuizData),
    isFetching: false,
    isPending: false,
    isModified: true,
    error: null,
    handleTopLevelChange: vi.fn(),
    handleQuestionChange: vi.fn(),
    handleAnswerChange: vi.fn(() => () => {}),
    handleCorrectAnswerChange: vi.fn(),
    cancelChanges: cancelChangesMock,
    saveChanges: saveChangesMock,
  }),
}));

// ---------- Tests ----------

describe("QuizEditView – Save functionality", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Save button is visible and enabled even when form is invalid", () => {
    render(<QuizEditView />);

    const saveButton = screen.getByTestId("quiz-edit-save");
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toBeEnabled();
  });

  test("shows error toast and does not navigate when saving invalid quiz", async () => {
    saveChangesMock.mockRejectedValue("Some fields require your attention.");

    render(<QuizEditView />);

    const addToastMock = vi.mocked(addToast);

    fireEvent.submit(screen.getByTestId("quiz-edit-form"));

    await waitFor(() => {
      expect(addToastMock).toHaveBeenCalledWith(
        expect.objectContaining({ color: "danger" })
      );
      expect(pushMock).not.toHaveBeenCalled();
    });
  });

  test("shows success toast and navigates when saving valid quiz", async () => {
    saveChangesMock.mockResolvedValue("Quiz Saved");

    render(<QuizEditView />);

    const addToastMock = vi.mocked(addToast);

    fireEvent.submit(screen.getByTestId("quiz-edit-form"));

    await waitFor(() => {
      expect(addToastMock).toHaveBeenCalledWith(
        expect.objectContaining({ color: "success" })
      );
      expect(pushMock).toHaveBeenCalledWith("/quiz-generator/test-id");
    });
  });

  test("Cancel button calls cancelChanges", async () => {
    render(<QuizEditView />);

    const user = userEvent.setup();

    await user.click(screen.getByTestId("quiz-edit-cancel"));

    expect(cancelChangesMock).toHaveBeenCalled();
  });
});
