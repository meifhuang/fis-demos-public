import { LessonPlanOutput } from "@/lib/llm-generation/schemas/lessonPlan.zod";
import { LessonPlanRecord } from "@/types/demos/lesson-plan";

export const saveLessonPlan = async (
  generatedLessonPlanOutput: LessonPlanOutput & {
    creation_meta: Record<string, unknown>;
  }
): Promise<LessonPlanRecord> => {
  const response = await fetch("/api/lesson-planner", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(generatedLessonPlanOutput),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to save lesson plan: ${errorText}`);
  }

  return response.json();
};
