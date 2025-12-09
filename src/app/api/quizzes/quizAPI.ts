import { QuizRecord } from "@/types/demos/quiz-generator";

/**
 * Fetches the list of course outlines (CourseOutlineRecord array).
 * Corresponds to: GET /course-outlines
 */
const fetchQuizList = async (): Promise<QuizRecord[]> => {
  const response = await fetch("/api/quizzes");
  if (!response.ok) {
    throw new Error("Failed to fetch course list.");
    
  }
  return response.json();
};

/**
 * Fetches the detailed course outline object (CourseOutlineDetail).
 * Corresponds to: GET /course-outlines/[id]
 */
// const fetchCourseOutlineDetail = async (
//   id: string
// ): Promise<CourseOutlineDetail> => {
//   const response = await fetch(`/api/course-outlines/${id}`);
//   if (!response.ok) {
//     throw new Error(`Failed to fetch course details for ID ${id}.`);
//   }
//   return response.json();
// };

export { fetchQuizList };
