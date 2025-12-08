import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CourseOutlineDetail } from "@/types";
import { courseKeys } from "./keys";

/**
 * API function to update an existing Course Outline record.
 */
const updateCourseOutline = async (
  updatedCourseData: CourseOutlineDetail
): Promise<CourseOutlineDetail> => {
  const response = await fetch(`/api/course-outlines/${updatedCourseData.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedCourseData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to update course (ID: ${updatedCourseData.id}): ${errorText}`
    );
  }
  return response.json();
};

/**
 * Hook for updating an existing Course Outline record,
 * updating both the specific detail cache and the list cache upon success.
 */
export const useUpdateCourseOutline = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: courseKeys.update(),
    mutationFn: updateCourseOutline,
    onSuccess: (updatedCourse: CourseOutlineDetail) => {
      // Manually update the specific detail view cache
      // This ensures the page viewing the course details immediately reflects the change.
      queryClient.setQueryData(
        courseKeys.detail(updatedCourse.id),
        updatedCourse
      );

      // Manually update the list cache for a faster UX (no refetch)
      queryClient.setQueryData(
        courseKeys.list(),
        (old: CourseOutlineDetail[] | undefined) => {
          if (!old) return undefined;

          // Find the index of the updated course and replace it
          return old.map((course) =>
            course.id === updatedCourse.id ? updatedCourse : course
          );
        }
      );
    },
    onError: (error) => {
      console.error("Course update failed:", error);
    },
  });
};
