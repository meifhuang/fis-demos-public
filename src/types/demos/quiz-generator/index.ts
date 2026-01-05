import { Database, SourceMaterialForm } from "@/types";

export type QuizDB = Database["public"]["Tables"]["quizzes"]
export type QuizRow = QuizDB["Row"]
export type QuizInsert = QuizDB["Insert"]
export type QuizUpdate = QuizDB["Update"]

export interface QuizFormState {
  title: string;
  description: string;
  customization: string;
  numberOfQuestions: string;
  learnerProfileId: string;
  sourceMaterial: SourceMaterialForm
}

export type QuizFormSubmission = Omit<QuizInsert, "creation_meta"> & {
  creation_meta: Record<string, unknown>
}


export interface Answer {
  text: string;
  feedback: string; 
  correct: boolean;
}

export interface Question {
  question:  string;
  answers: Answer[];
}
