import { openAIService } from "@/lib/llm-generation/openai/OpenAIService";
import {
  LessonSchema,
  LessonOutput,
} from "@/lib/llm-generation/schemas/lessons.zod";
import { LessonRecord } from "@/types/demos/lesson";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: LessonRecord = await req.json();
    const prompt = `
        Create a thorough lesson based on the following source material and learner profile. 
        
        Learner profile:
        Name: ${body.creation_meta?.learner_profile?.label}
        Age: ${body.creation_meta?.learner_profile?.age}
        Interests: ${body.creation_meta?.learner_profile?.interests}

        Source material:
        Title: ${body.creation_meta?.source_material?.title}
        Content: ${body.creation_meta?.source_material?.content}
    `;
    const result = await openAIService.generateStructuredContent<LessonOutput>(
      prompt,
      LessonSchema,
      {
        systemPrompt:
          "You are an expert lesson plan designer. Always follow the provided schema exactly.",
        developerPrompt:
          "Do not include commentary, markdown, or explanations. Structured data only.",
        temperature: 0.7,
        max_output_tokens: 1200,
      },
    );
    return NextResponse.json({ ...result });
  } catch (error) {
    console.error("POST /lesson/generate", error);
    return NextResponse.json(
      { error: "Failed to generate lesson" },
      { status: 500 },
    );
  }
}
