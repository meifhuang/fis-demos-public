import { useQuery } from "@tanstack/react-query";
import { lessonsKeys } from "./keys";
import { Lesson } from "../models/Lesson";
// import { LessonRecord } from "@/types/demos/lesson";
import { getLessonList } from "../services/getLessonList";

/**
 * Hook to fetch the list of lesson record summaries.
 */

export const useLessonList = ({ retry = true }: { retry?: boolean } = {}) => {
  const query = useQuery<Lesson[], Error>({
    retry,
    queryKey: lessonsKeys.list(),
    queryFn: getLessonList,
  });

  return query;
};
