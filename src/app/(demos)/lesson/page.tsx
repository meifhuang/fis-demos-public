"use client";

import ListView from "../_components/List";
import DemoNavigationPanel from "../_components/DemoNavigationPanel";
import { Lesson, useLessonList } from "@/features/lessons";
import LessonListRecord from "@/features/lessons/components/LessonsListRecord";

export default function LessonDemoPage() {
  const { data: content, isLoading, error } = useLessonList();

  if (error) {
    return <p>Error loading content</p>;
  }

  return (
    <>
      <DemoNavigationPanel backRoute="/" />
      <ListView<Lesson>
        records={content ?? []}
        title="Lesson Demo"
        createNewRoute="/lesson/create"
        RenderItem={LessonListRecord}
        isLoading={isLoading}
      />
    </>
  );
}
