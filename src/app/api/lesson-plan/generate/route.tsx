import { openAIService } from "@/lib/llm-generation/openai/OpenAIService";
import {
  LessonPlanSchema,
  LessonPlanOutput,
} from "@/lib/llm-generation/schemas/lessonPlan.zod";
import { LessonPlanRecord } from "@/types/demos/lesson-plan";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: LessonPlanRecord = await req.json();

    const prompt = `
    Create a lesson plan based on the following source material content and learner profile

	Learner profile:
	Name: ${body.creation_meta.learner_profile.label}
	Age: ${body.creation_meta.learner_profile.age}
	Interests: ${body.creation_meta.learner_profile.interests}

	Source material:
	Title: ${body.creation_meta.source_material.title}
	Content: ${body.creation_meta.source_material.content}
    `;

    const result =
      await openAIService.generateStructuredContent<LessonPlanOutput>(
        prompt,
        LessonPlanSchema,
        {
          systemPrompt:
            "You are an expert lesson plan designer. Always follow the provided schema exactly.",
          developerPrompt:
            "Do not include commentary, markdown, or explanations. Structured data only.",
          temperature: 0.7,
          max_output_tokens: 1200,
        }
      );

    return NextResponse.json({ ...result });
  } catch (error) {
    console.error("POST /lesson-plan/generate", error);
    return NextResponse.json(
      { error: "Failed to generate lesson plan" },
      { status: 500 }
    );
  }
}
