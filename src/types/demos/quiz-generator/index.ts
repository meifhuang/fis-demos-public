import { BaseListRecord, Database, SourceMaterialForm } from "@/types";

export interface QuizRecord extends BaseListRecord {
  title: string;
  description: string;
  numberOfQuestions: number;
  learnerProfileId: string;
  sourceLessonId: string
}

export interface QuizFormState {
  title: string;
  description: string;
  customization: string;
  numberOfQuestions: string;
  learnerProfileId: string;
  sourceMaterial: SourceMaterialForm
}

export type QuizInsert = Database["public"]["Tables"]["quizzes"]["Insert"]

export type QuizFormSubmission = Omit<QuizInsert, "creation_meta"> & {
  creation_meta: Record<string, unknown>
}

export type QuizRow = Database["public"]["Tables"]["quizzes"]["Row"]

export interface Answer {
  text: string;
  feedback: string; 
}

export interface Question {
  question:  string;
  answer: Answer;
  distractors: Answer[];
}
