import { Answer, Question } from "@/types";
import { z } from "zod";

export const AnswerSchema = z.object({
  text: z.string().min(1),
  feedback: z.string(),
});

export const QuestionSchema = z.object({
  question: z.string().min(1),
  answers: z.array(AnswerSchema).min(1),
  correctAnswerIndex: z.number(),
});

type QuestionSchema = z.infer<typeof QuestionSchema>;

export function generationSchema(questionCount: number) {
  return z.object({
    questions: z.array(QuestionSchema).length(questionCount),
  });
}

export function cleanIntoStandardQuestion(
  questions: QuestionSchema[],
): Question[] {
  return questions.map((schemaQuestion): Question => {
    const correctIndex = schemaQuestion.correctAnswerIndex;
    const answers = schemaQuestion.answers.map((schemaAnswer, i): Answer => {
      return {
        text: schemaAnswer.text,
        feedback: schemaAnswer.feedback,
        correct: i === correctIndex,
      };
    });

    return {
      question: schemaQuestion.question,
      answers,
    };
  });
}

export type QuestionOutput = z.infer<ReturnType<typeof generationSchema>>;
