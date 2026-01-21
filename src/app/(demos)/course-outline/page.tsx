"use client";

import { CourseOutline } from "./_models";
import ListView from "../_components/List";
import CourseOutlineListRecord from "./_components/CourseOutlineListRecord";
import { useCourseOutlines } from "./_store";
import DemoNavigationPanel from "../_components/DemoNavigationPanel";

export default function CourseOutlineDemoPage() {
  const { data: outlines, isLoading, isError, error } = useCourseOutlines();

  if (isError) {
    return (
      <>
        <DemoNavigationPanel backRoute="/" />
        <p>Error loading courses: {error.message}</p>
      </>
    );
  }

  return (
    <>
      <DemoNavigationPanel backRoute="/" />
      <ListView<CourseOutline>
        records={outlines ?? []}
        title="Course Outlines"
        createNewRoute="/course-outline/create"
        RenderItem={CourseOutlineListRecord}
        isLoading={isLoading}
      />
    </>
  );
}
