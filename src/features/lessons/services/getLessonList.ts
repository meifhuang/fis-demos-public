import { LessonRow, Lesson } from "../models/Lesson";
/**
 * Fetches the list of lessons (LessonRecord array).
 * Corresponds to: GET /lessons
 */

export async function getLessonList() {
  const response = await fetch("/api/lessons");
  if (!response.ok) throw new Error("Failed to fetch lesson plan list");

  const rows: LessonRow[] = await response.json();
  return rows.map((row) => new Lesson(row));
}
