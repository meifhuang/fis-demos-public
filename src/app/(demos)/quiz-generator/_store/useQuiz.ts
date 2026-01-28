import { getQuiz } from "../_services";
import { Quiz } from "../_models";
import { useQuery } from "@tanstack/react-query";
import { quizKeys } from "./keys";

/**
 * Hook to fetch an individual Quiz.
 */
export const useQuiz = (id: string) => {
  return useQuery<Quiz, Error>({
    queryKey: quizKeys.detail(id),
    queryFn: () => getQuiz(id),
    enabled: !!id,
  });
};
