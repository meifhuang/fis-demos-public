"use client";

import ListView from "../_components/List";
import { LessonPlanRecord } from "@/types/demos/lesson-plan";
import DemoNavigationPanel from "../_components/DemoNavigationPanel";
import { LessonPlanListRecord } from "@/features/lesson-planner";
import { useListLessonPlan } from "@/features/lesson-planner";

export default function LessonPlanDemoPage() {
  // Get lesson array using tanstack query hook
  const { data: lessons, isLoading, isError, error } = useListLessonPlan();

  if (isError) {
    return <p>Error loading lessons: {error.message}</p>;
  }

  return (
    <>
      <DemoNavigationPanel backRoute="/" />
      <ListView<LessonPlanRecord>
        records={lessons ?? []}
        title="Lesson Plans"
        createNewRoute="/lesson-planner/create"
        RenderItem={LessonPlanListRecord}
        isLoading={isLoading}
      />
    </>
  );
}
