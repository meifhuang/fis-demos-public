import * as Sentry from "@sentry/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { getClient } from "@/lib/supabase";
import { z } from "zod";

const LessonPlanInsertSchema = z
  .object({
    creation_meta: z.object({
      learner_profile: z.object({
        age: z.number(),
        label: z.string(),
        interests: z.array(z.string()),
        experience: z.string(),
        reading_level: z.number(),
      }),
      source_material: z.object({
        title: z.string().min(1),
        content: z.string().min(1),
      }),
    }),

    introduction: z.string().min(1),
    context: z.string().min(1),
    example: z.string().min(1),
    practice: z.string().min(1),
    assessment: z.string().min(1),
    reflection: z.string().min(1),
  })
  .strict();

export type LessonPlanInsert = z.infer<typeof LessonPlanInsertSchema>;

/**
 * Index lesson plans
 */
export async function GET() {
  const supabase = getClient();

  const { data, error } = await supabase.from("lesson_plans").select("*");

  if (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: NextRequest) {
  const supabase = getClient();

  const body = await req.json();
  if (!body) {
    return NextResponse.json(null, { status: 400, statusText: "Empty body" });
  }

  const parsed = LessonPlanInsertSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("lesson_plans")
    .insert(parsed.data)
    .select("*")
    .single();

  if (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
