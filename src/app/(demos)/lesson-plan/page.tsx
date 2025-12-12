"use client";

import ListView from "../_components/List";
import LessonPlanListRecord from "./_components/LessonPlanListRecord";
import { LessonPlanOutlineRecord } from "@/types/demos/lesson-plan";
import { useLessonPlanList } from "./_store/useLessonOutlineList";

export default function LessonPlanDemoPage() {
  // Get lesson array using tanstack query hook
  const { data: lessons, isLoading, isError, error } = useLessonPlanList();

  if (isError) {
    return <p>Error loading lessons: {error.message}</p>;
  }

  return (
    <ListView<LessonPlanOutlineRecord>
      records={lessons ?? []}
      title="Lesson Plans"
      createNewRoute="/lesson-plan/create"
      RenderItem={LessonPlanListRecord}
      isLoading={isLoading}
    />
  );
}
