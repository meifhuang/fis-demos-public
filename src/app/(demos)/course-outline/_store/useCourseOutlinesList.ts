import { CourseOutline } from "../_models";
import { courseKeys } from "./keys";
import { getCourseOutlines } from "../_fetchers";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook to fetch the list of CourseOutlines
 */
export const useCourseOutlinesList = () => {
  const query = useQuery<CourseOutline[], Error>({
    queryKey: courseKeys.list(),
    queryFn: getCourseOutlines,
  });

  return query;
};
