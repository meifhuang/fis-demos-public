import { useMutation } from "@tanstack/react-query";
import { lessonKeys } from "./keys";
import { generateLessonPlan } from "../services/generateLessonPlan";

/**
 * Hook for generating a new Course Outline record
 */
export const useLessonPlanGenerate = () => {
  return useMutation({
    mutationKey: lessonKeys.create(),
    mutationFn: generateLessonPlan,
  });
};
