import { z } from "zod";

export const LessonPlanSchema = z.object({
  // id: z.string().optional(),
  // creation_meta: z.object({
  //   learner_profile: z.object({
  //     age: z.number(),
  //     label: z.string(),
  //     interests: z.array(z.string()),
  //     experience: z.string(),
  //     reading_level: z.number(),
  //   }),
  //   source_material: z.object({
  //     title: z.string(),
  //     content: z.string(),
  //   }),
  // }),
  introduction: z.string(),
  context: z.string(),
  example: z.string(),
  practice: z.string(),
  assessment: z.string(),
  reflection: z.string(),
  // created_at: z.string().optional(),
  // updated_at: z.string().optional(),
});

export type LessonPlanOutput = z.infer<typeof LessonPlanSchema>;
