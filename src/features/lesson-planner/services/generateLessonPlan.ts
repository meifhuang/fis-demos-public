import { LessonPlanOutput } from "@/lib/llm-generation/schemas/lessonPlan.zod";
import { LessonPlanRecord } from "@/types/demos/lesson-plan";

export const generateLessonPlan = async (
  newLessonData: Partial<LessonPlanRecord>,
): Promise<LessonPlanOutput> => {
  const response = await fetch("/api/lesson-planner/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newLessonData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create lesson plan: ${errorText}`);
  }

  return response.json();
};
