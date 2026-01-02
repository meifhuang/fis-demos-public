import { useMutation } from "@tanstack/react-query";
import { quizKeys } from "./keys";
import { createQuiz } from "../_services";

/**
 * Hook for creating a new Course Outline record, invalidating the list cache upon success.
 */
export const useCreateQuiz= () => {
  return useMutation({
    mutationKey: quizKeys.create(),
    mutationFn: createQuiz,
  });
};
