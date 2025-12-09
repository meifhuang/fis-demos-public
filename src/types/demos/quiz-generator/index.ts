import { BaseListRecord } from "@/types";

export interface QuizRecord extends BaseListRecord {
  title: string;
  description: string;
  numberOfQuestions: number;
  learnerProfileId: string;
  sourceLessonId: string
}

