import { CourseOutline } from "../_models";
import { courseKeys } from "./keys";
import { deleteCourseOutline } from "../_services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Hook for deleting an existing Course Outline record.
 * @returns The mutation object. The success handler receives the the coursew
 * outline object that was deleted.
 */
export const useDeleteCourseOutline = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: courseKeys.delete(),
    mutationFn: deleteCourseOutline,
    onSuccess: (deleted: CourseOutline) => {
      // 1. Manually invalidate or remove the specific detail cache entry
      // Removing is cleaner than invalidating for a deleted item:
      queryClient.removeQueries({ queryKey: courseKeys.detail(deleted.id) });

      // 2. Manually update the list cache to remove the deleted item (Optimistic/Manual Update)
      queryClient.setQueryData(
        courseKeys.list(),
        (cache: CourseOutline[] | undefined) => {
          if (!cache) return undefined;

          return cache.filter((cached) => cached.id !== deleted.id);
        },
      );
    },
    onError: (error) => {
      // Log the error message or display a notification
      console.error("Course outline deletion failed:", error);
    },
  });
};
