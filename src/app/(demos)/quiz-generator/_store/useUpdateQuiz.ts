import { quizKeys } from "./keys";
import { putQuiz } from "../_services"
import { useMutation } from "@tanstack/react-query";

/**
 * Hook for updating an existing Quiz record,
 * updating both the specific detail cache and the list cache upon success.
 */
export const useUpdateQuiz = () => {
  return useMutation({
    mutationKey: quizKeys.update(),
    mutationFn: putQuiz,
    onError: (error) => {
      console.error("Quiz update failed:", error);
    },
  });
};
