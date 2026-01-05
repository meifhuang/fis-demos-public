import { QuizRow } from "@/types";
import { Quiz } from "../_models";

export async function getQuiz(id: string) {
  const res = await fetch(`/api/quizzes/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch quiz '${id}'`);

  const row: QuizRow = await res.json();
  return new Quiz(row);
}
