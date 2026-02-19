import { LessonRecord } from "@/types/demos/lesson";

/**
 * Fetches the list of lessons (LessonRecord array).
 * Corresponds to: GET /lessons
 */

export const getLessonList = async (): Promise<LessonRecord[]> => {
  const response = await fetch("/api/lessons");
  if (!response.ok) {
    throw new Error("Failed to fetch lesson plan list");
  }
  return await response.json();
};
