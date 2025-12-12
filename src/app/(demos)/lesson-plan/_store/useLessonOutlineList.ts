import { useQuery } from "@tanstack/react-query";
import { lessonKeys } from "./keys";
import { LessonPlanOutlineRecord } from "@/types/demos/lesson-plan";
import { fetchLessonPlanOutlinesList } from "@/app/api/lesson-plan/lessonPlanListApi";

/**
 * Hook to fetch the list of CourseOutlineRecord summaries.
 */
export const useLessonPlanList = () => {
  const query = useQuery<LessonPlanOutlineRecord[], Error>({
    queryKey: lessonKeys.list(),
    queryFn: fetchLessonPlanOutlinesList,
  });

  return query;
};
