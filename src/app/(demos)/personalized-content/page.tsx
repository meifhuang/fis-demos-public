"use client";

import {
  PersonalizedContent,
  usePersonalizedContentList,
} from "@/features/personalized-content";
import ListView from "../_components/List";
import PersonalizedContentListRecord from "@/features/personalized-content";
import DemoNavigationPanel from "../_components/DemoNavigationPanel";

export default function PersonalizedContentDemoPage() {
  const { data: content, isLoading, error } = usePersonalizedContentList();

  if (error) {
    return <p>Error loading content</p>;
  }

  return (
    <>
      <DemoNavigationPanel backRoute="/" />
      <ListView<PersonalizedContent>
        records={content ?? []}
        title="Personalized Content Demo"
        createNewRoute="/personalized-content/create"
        RenderItem={PersonalizedContentListRecord}
        isLoading={isLoading}
      />
    </>
  );
}
