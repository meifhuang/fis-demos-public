import { useQuery } from "@tanstack/react-query";
import { lessonsKeys } from "./keys";
import { LessonRecord } from "@/types/demos/lesson";
import { getLessonList } from "../services/getLessonList";

/**
 * Hook to fetch the list of lesson record summaries.
 */

export const useListLesson = () => {
  const query = useQuery<LessonRecord[], Error>({
    queryKey: lessonsKeys.list(),
    queryFn: getLessonList,
  });

  return query;
};
