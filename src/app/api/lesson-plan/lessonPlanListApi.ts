import { LessonPlanOutlineRecord } from "@/types/demos/lesson-plan";

/**
 * Fetches the list of lesson outlines (LessonPlanOutlineRecord array).
 * Corresponds to: GET /lesson-plan
 */
export const fetchLessonPlanOutlinesList = async (): Promise<
  LessonPlanOutlineRecord[]
> => {
  const response = await fetch("/api/lesson-plan");
  if (!response.ok) {
    throw new Error("Failed to fetch lesson plan list.");
  }
  return response.json();
};
