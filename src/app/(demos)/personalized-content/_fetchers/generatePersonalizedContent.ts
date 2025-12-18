import { CourseOutlineOutput } from "@/lib/llm-generation/schemas/courseOutline.zod";
import { PersonalizedContentFormState } from "@/types";

export const generatePersonalizedContent = async (
  newContentData: PersonalizedContentFormState
): Promise<CourseOutlineOutput> => {
  const response = await fetch("/api/personalized-content/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newContentData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create course: ${errorText}`);
  }

  return response.json();
};
