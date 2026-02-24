import { getLesson } from "../services/getLesson";
import { Lesson } from "../models/Lesson";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { lessonsKeys } from "./keys";

/**
 * Hook to fetch an individual Lessons.
 */
export const useGetLesson = (
  id: string,
  { retry = true }: { retry?: boolean },
) => {
  const queryClient = useQueryClient();
  const cache = queryClient.getQueryData<Lesson[]>(lessonsKeys.list());
  const placeholderData = cache?.find((lesson) => lesson.id === id);

  return useQuery<Lesson, Error>({
    retry,
    placeholderData,
    queryKey: lessonsKeys.detail(id),
    queryFn: () => getLesson(id),
    enabled: !!id,
  });
};
