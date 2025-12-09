// Quiz API Logic (e.g., in a file like src/api/quiz.ts)

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { quizKeys } from "./keys";
import { QuizRecord } from "@/types/demos/quiz-generator";

/**
 * API function to delete an existing Quiz record by ID.
 * @param id The ID of the quiz to delete.
 */
const deleteQuiz = async (id: string): Promise<string> => {
  const response = await fetch(`/api/quizzes/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to delete quiz (ID: ${id}): ${errorText}`);
  }

  return id;
};

/**
 * Hook for deleting an existing Quiz record.
 * @returns The mutation object. The success handler receives the ID (string) of the deleted quiz.
 */
export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: quizKeys.delete(),
    mutationFn: deleteQuiz,
    onSuccess: (deletedId: string) => {
      // 1. Manually invalidate or remove the specific detail cache entry
      // Removing is cleaner than invalidating for a deleted item:
      queryClient.removeQueries({ queryKey: quizKeys.detail(deletedId) });

      // 2. Manually update the list cache to remove the deleted item (Optimistic/Manual Update)
      queryClient.setQueryData(
        quizKeys.list(),
        (old: QuizRecord[] | undefined) => {
          if (!old) return undefined;

          // Filter out the deleted course from the list
          return old.filter((course) => course.id !== deletedId);
        }
      );
    },
    onError: (error) => {
      // Log the error message or display a notification
      console.error("Course deletion failed:", error);
    },
  });
};
