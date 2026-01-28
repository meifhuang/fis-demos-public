import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LessonPlanRecord } from "@/types/demos/lesson-plan";
import { lessonKeys } from "./keys";
import { saveLessonPlan } from "../services/saveLessonPlan";

/**
 * Hook for saving a Lesson Plan record.
 * Adds the lesson plan to the existing list cache on success.
 */
export const useLessonPlanSave = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: lessonKeys.save(),
    mutationFn: saveLessonPlan,
    onSuccess: (newLesson: LessonPlanRecord) => {
      const existingLessons = queryClient.getQueryData(lessonKeys.list());

      if (existingLessons) {
        queryClient.setQueryData(
          lessonKeys.list(),
          (old: LessonPlanRecord[]) => [newLesson, ...old],
        );
      }
    },
  });
};
