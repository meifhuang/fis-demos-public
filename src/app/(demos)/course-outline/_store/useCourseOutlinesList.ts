import { useQuery } from "@tanstack/react-query";
import { CourseOutlineRecord } from "@/types";
import { courseKeys } from "./keys";
import { fetchCourseOutlinesList } from "@/app/api/course-outlines/courseOutlineApi";

/**
 * Hook to fetch the list of CourseOutlineRecord summaries.
 */
export const useCourseOutlinesList = () => {
  const query = useQuery<CourseOutlineRecord[], Error>({
    queryKey: courseKeys.list(),
    queryFn: fetchCourseOutlinesList,
  });

  return query;
};
