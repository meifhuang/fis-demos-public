import { CourseOutline } from "../_models";

/**
 * API function to delete an existing Course Outline record.
 */
export async function deleteCourseOutline(courseOutline: CourseOutline) {
  const res = await fetch(`/api/course-outlines/${courseOutline.id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const { error }: { error: string } = await res.json();
    throw new Error(
      `Failed to delete course outline '${courseOutline.id}': ${error}`,
    );
  }

  return courseOutline;
}
