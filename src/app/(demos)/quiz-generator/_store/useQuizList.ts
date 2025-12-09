import { useQuery } from "@tanstack/react-query";
import { quizKeys } from "./keys";
import { QuizRecord } from "@/types/demos/quiz-generator";
import { fetchQuizList } from "@/app/api/quizzes/quizAPI";

/**
 * Hook to fetch the list of QuizRecord summaries.
 */
export const useQuizList = () => {
  const query = useQuery<QuizRecord[], Error>({
    queryKey: quizKeys.list(),
    queryFn: fetchQuizList,
  });

  return query;
};
