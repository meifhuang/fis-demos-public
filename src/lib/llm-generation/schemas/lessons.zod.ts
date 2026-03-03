import { z } from "zod";

export const LessonSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type LessonOutput = z.infer<typeof LessonSchema>;
