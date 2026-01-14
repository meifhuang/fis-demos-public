import * as Sentry from "@sentry/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { getClient } from "@/lib/supabase";
import z from "zod";
import { Database, Json } from "@/types";

const supabase = getClient();

/**
 * Index personalized content 
 */
export async function GET() {
  const { data, error } = await supabase.from("personalized_contents").select("*");

  if (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

type PersonalizedContentInsert =
  Database["public"]["Tables"]["personalized_contents"]["Insert"];

export const LearnerProfileSchema = z.object({
  age: z.number().int().min(1, "Age must be a positive number"),
  label: z.string().min(1, "Label is required"),
  interests: z.array(z.string()),
  experience: z.string().optional().or(z.literal("")),
  reading_level: z.number().min(0),
});

export const SourceMaterialSchema = z.object({
  title: z.string().min(1, "Source title is required"),
  markdown: z.string().min(1, "Source markdown is required"),
});

export const CreationMetaSchema = z.object({
  learner_profile: LearnerProfileSchema,
  source_material: SourceMaterialSchema.optional(),
});

const PersonalizedContentInsertSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  creation_meta: z.record(z.string(), z.unknown()).default({}),
  content: z.string().min(1),
});

/**
 * Add personalized content to database
 */
export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body) {
    return NextResponse.json(null, { status: 400, statusText: "Empty body" });
  }

  const parsed = PersonalizedContentInsertSchema.parse(body);

  const payload: PersonalizedContentInsert = {
    ...parsed,
    creation_meta: parsed.creation_meta as Json,
    content: parsed.content as string,
  };

  const { data, error } = await supabase
    .from("personalized_contents")
    .insert(payload)
    .select()
    .single();

  if (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
