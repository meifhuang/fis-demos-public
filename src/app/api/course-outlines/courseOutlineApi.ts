import { CourseOutlineDetail } from "@/types";

/**
 * Fetches the detailed course outline object (CourseOutlineDetail).
 * Corresponds to: GET /course-outlines/[id]
 */
const fetchCourseOutlineDetail = async (
  id: string
): Promise<CourseOutlineDetail> => {
  const response = await fetch(`/api/course-outlines/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch course details for ID ${id}.`);
  }
  return response.json();
};

export { fetchCourseOutlineDetail };
