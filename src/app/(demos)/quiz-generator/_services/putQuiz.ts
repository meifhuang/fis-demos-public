import { QuizRow } from "@/types";
import { Quiz } from "../_models";

/**
 * API function to update an existing Quiz record.
 */
export async function putQuiz(quiz: Quiz) {
  const res = await fetch(`/api/quizzes/${quiz.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quiz.asUpdate()),
  });

  if (!res.ok) {
    const { error }: { error: string } = await res.json();
    throw new Error(`Failed to update quiz '${quiz.id}': ${error}`);
  }

  const row: QuizRow = await res.json();
  return new Quiz(row);
}
