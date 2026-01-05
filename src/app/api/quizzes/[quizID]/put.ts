import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";
import { getClient } from "@/lib/supabase";
import { z } from "zod";
import { QuizUpdate } from "@/types";

const answer = z.object({
  text: z.string().min(1),
  feedback: z.string()
})

const question = z.object({
  question: z.string().min(1),
  answer: answer,
  distractors: z.array(answer).min(1)
})

const quiz = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  questions: z.array(question).optional(),
}).strict();

/**
 * Update quiz
 */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ quizID: string }> }
) {
  const id = (await params).quizID;
  const { data: input, error: zError } = quiz.safeParse(await req.json());

  if (zError) {
    Sentry.captureException(zError);
    return NextResponse.json({ error: z.prettifyError(zError) }, { status: 422 });
  }

  const supabase = getClient();
  const { data: record, error: dbError } = await supabase
    .from("quizzes")
    .update(input satisfies QuizUpdate)
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (dbError) {
    Sentry.captureException(dbError);
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  if (!record) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(record, { status: 200 });
}
